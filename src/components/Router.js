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
const SearchPath = require('./SearchPath');

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


    if (verb === '#search/') {
      // TODO: make the split better
      // ML: I made it a bit worse by adding search params
      // need to rethink this so that facet links can compose - this is what 
      // issue ST-361 needs to deal with 

      console.log(`match = ${JSON.stringify(query)}`);

      const { start, page, search } = SearchPath.fromURI(state.main.start, '', query);

      console.log(`start ${start} page ${page} search ${JSON.stringify(search)}`);

      const res = await solrService.select({api: state.config.api}, {
        start: start,
        page: page,
        search: search,
        facets: state.facets.map((f) => f.name),
        facetLimit: state.facetLimit
      });

      if (res.status === 200) {
        state.main.docs = res.data.docs;
        state.main.numFound = res.data.numFound;
        state.main.searchText = search['main_search'] || '';
        state.main.currentSearch = search;
        state.facetResult = res.facets;
        state.facetData = FacetController.process({config: state.facets, data: state.facetResult['facet_fields']});
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), Main(state), Footer(state)])].join('');
        const input = document.getElementById('text-to-search');
        if (input) {
          input.value = search['main_search'] || '';
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
      search: null,
      facets: state.facets.map((f) => f.name),
      facetLimit: state.facetLimit
    });
    if (res.status === 200) {
      state.main.docs = res.data.docs;
      state.main.numFound = res.data.numFound;
      state.main.searchText = '';
      state.main.currentSearch = {};
      state.facetResult = res.facets;
      state.facetData = FacetController.process({config: state.facets, data: state.facetResult['facet_fields']});
      app.innerHTML = [Container([Header(state), Menu(state), Search(state), Main(state), Footer(state)])].join('');
    } else {
      app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewError(state), Footer(state)])].join('');
    }
  }
};

module.exports = Router;
