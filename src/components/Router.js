const Container = require('./views/Container');
const Header = require('./views/Header');
const Menu = require('./views/Menu');
const Main = require('./views/Main');
const Footer = require('./views/Footer');
const Search = require('./views/Search');
const ViewDoc = require('./views/ViewDoc');
const ViewError = require('./views/ViewError');
const FacetController = require('./FacetController');

const solrService = require('./SolrService');

const Router = async function (state) {
  const route = window.location.hash;
  const app = document.querySelector('#app');

  if (route) {
    const match = route.match(/(#.*?\/)(.*)/);
    const verb = match[1];
    const query = match[2];


    if (verb === '#view/') {
      const res = await solrService.select({api: state.config.api}, {
        start: 0,
        page: 1,
        searchParam: 'id',
        text: query,
        facets: false
      });
      if (res.status === 200 && res.data["numFound"] === 1 ) {
        state.main.doc = res.data["docs"][0];
        // //Just to avoid extra ajax calls but we can have multiple relationships here
        // if (state.main.doc.record_type_s || state.main.doc.record_type_s === 'Person') {
        //   //Removing orcid.org to have better matches
        //   state.main.doc.id = state.main.doc.id.replace("http://orcid.org/0000-000", "");
        //   //state.main.doc.id = encodeURIComponent(state.main.doc.id);
        //   const res = await solrService.select({api: state.config.api}, {
        //     start: 0,
        //     page: 1,
        //     searchParam: 'uri_id',
        //     text: state.main.doc.id,
        //     facets: false
        //   });
        //   if (status === 200) {
        //     state.main.related = res.data.docs || [];
        //   }
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewDoc(state), Footer(state)])].join('');
      } else {
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewError(state), Footer(state)])].join('');
      }
    }
    // this needs to be able to specify a search param for facets
    // and facets should be able to compose
    if (verb === '#search/') {
      // TODO: make the split better
      // ML: I made it a bit worse by adding search params
      // need to rethink this so that facet links can compose - this is what 
      // issue ST-361 needs to deal with 
      const splits = match[2].split('/');
      const start = splits[0] || state.main.start;
      const page = splits[1] || '';
      var searchParam = state.search.mainSearch;
      var searchText = splits[2] || '';
      const searchparts = searchText.split('=');
      if( searchparts.length === 2 ) {
        searchParam = searchparts[0];
        searchText = searchparts[1];
      }
      const res = await solrService.select({api: state.config.api}, {
        start: start,
        page: page,
        searchParam: searchParam,
        text: searchText,
        facets: state.facets.map((f) => f.name),
        facetLimit: state.facetLimit
      });
      if (res.status === 200) {
        state.main.docs = res.data.docs;
        state.main.numFound = res.data.numFound;
        state.main.searchText = searchText;
        state.facetResult = res.facets;
        state.facetData = FacetController.process({config: state.facets, data: state.facetResult['facet_fields']});
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), Main(state), Footer(state)])].join('');
        const input = document.getElementById('text-to-search');
        if (input) {
          input.value = searchText;
        }
      } else {
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewError(state), Footer(state)])].join('');
      }
    }
  } else {
    // TODO: Move some of these config data to config
    const res = await solrService.select({api: state.config.api}, {
      start: state.main.start,
      page: state.main.page,
      searchParam: '*',
      text: '*',
      facets: state.facets.map((f) => f.name),
      facetLimit: state.facetLimit
    });
    if (res.status === 200) {
      state.main.docs = res.data.docs;
      state.main.numFound = res.data.numFound;
      state.main.searchText = '';
      state.facetResult = res.facets;
      state.facetData = FacetController.process({config: state.facets, data: state.facetResult['facet_fields']});
      app.innerHTML = [Container([Header(state), Menu(state), Search(state), Main(state), Footer(state)])].join('');
    } else {
      app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewError(state), Footer(state)])].join('');
    }
  }
};

module.exports = Router;
