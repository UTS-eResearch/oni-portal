const Container = require('./views/Container');
const Header = require('./views/header');
const Menu = require('./views/menu');
const Main = require('./views/main');
const Footer = require('./views/footer');
const Search = require('./views/search');
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
      let {data, status} = await solrService.get({api: state.config.api}, query);
      if (status === 200) {
        state.main.doc = data;
        //Just to avoid extra ajax calls but we can have multiple relationships here
        if (state.main.doc.record_type_s || state.main.doc.record_type_s === 'Person') {
          //Removing orcid.org to have better matches
          state.main.doc.id = state.main.doc.id.replace("https://orcid.org/", "");
          //state.main.doc.id = encodeURIComponent(state.main.doc.id);
          //state.main.doc.id = encodeURIComponent(state.main.doc.id);
          const res = await solrService.search({api: state.config.api}, {
            start: 0,
            page: 1,
            searchParam: 'author_id%3A',
            text: state.main.doc.id,
            facets: false
          });
          if (status === 200) {
            state.main.related = res.data.docs || [];
          }
        }
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewDoc(state), Footer(state)])].join('');
      } else {
        app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewError(state), Footer(state)])].join('');
      }
    }
    if (verb === '#search/') {
      //TODO: make the split better
      const splits = match[2].split('/');
      const start = splits[0] || state.main.start;
      const page = splits[1] || '';
      let searchText = splits[2] || '';
      const {data, status} = await solrService.search({api: state.config.api}, {
        start: start,
        page: page,
        searchParam: 'main_search%3A',
        text: searchText,
        facets: state.facets,
        facetLimit: state.facetLimit
      });
      if (status === 200) {
        state.main.docs = data.docs;
        state.main.numFound = data.numFound;
        state.main.searchText = searchText;
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
    const res = await solrService.search({api: state.config.api}, {
      start: state.main.start,
      page: state.main.page,
      searchParam: '*%3A',
      text: '*',
      facets: state.facets,
      facetLimit: state.facetLimit
    });
    if (res.status === 200) {
      state.main.docs = res.data.docs;
      state.main.numFound = res.data.numFound;
      state.main.searchText = '';
      state.facetResult = res.facets;
      const facetContent = FacetController.get({data: state.facetResult['facet_fields'][state.facets[0]], toJSON: true});
      // TODO: Move this to config
      const facetData = FacetController.display({data: facetContent, config: {
        name: 'Dataset_author_facetmulti',
        route: '#view/',
        searchUrl: '@id',
        searchText: 'name'
        }
      });
      state.facetData = facetData;
      app.innerHTML = [Container([Header(state), Menu(state), Search(state), Main(state), Footer(state)])].join('');
    } else {
      app.innerHTML = [Container([Header(state), Menu(state), Search(state), ViewError(state), Footer(state)])].join('');
    }
  }
};

module.exports = Router;
