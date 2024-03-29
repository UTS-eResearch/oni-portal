const Layout = require('./views/Layout');
const Page = require('./views/Page');
const SearchResults = require('./views/SearchResults');
const Facets = require('./views/Facets');
const Footer = require('./views/Footer');
const ViewDoc = require('./views/ViewDoc');
const ViewError = require('./views/ViewError');

const solrService = require('./SolrService');
const SearchPath = require('./SearchPath');

const Router = async function (state) {
  const route = window.location.hash;
  const app = document.querySelector('#app');
  let verb = '';
  let query = '';

  if (route) {
    const match = route.match(/(#.*?\/)(.*)/);
    verb = match[1];
    query = match[2];
  }


  if (verb === '#view/') {

    // Load and view a single item

    const res = await solrService.select(state, {
      start: 0,
      page: 1,
      search: { id: decodeURIComponent(query) },
      facets: false
    });
    if (res.status === 200 && res.data["numFound"] === 1 ) {
      state.main.doc = res.data["docs"][0];
      const main_html = await ViewDoc.main(state);
      app.innerHTML = Layout(state, ViewDoc.summary(state), main_html);
    } else {
      app.innerHTML = Layout(state, '', ViewError(state));
    }

  } else if( verb === '#page/' ) {

    // Render one of the help pages in the main column and facets
    // from the most recent search in the sidebar


    const page = state.pages[query] || state.errors.not_found;
    app.innerHTML = Layout(state, Facets.sidebar(state), Page(page));

  } else {

    // Do a new search and render either the search results or a focussed
    // facet in the main column

    const { start, page, search } = SearchPath.fromURI(state.main.start, '', query);

    const showFacet = search['showFacet'];
    delete search['showFacet'];

    const res = await solrService.select(state, {
      start: start,
      page: page,
      search: search,
      showFacet: showFacet
    });

    if (res.status === 200) {
      state.main.docs = res.data.docs;
      state.main.numFound = res.data.numFound;
      state.main.searchText = search['main_search'] || '';
      state.main.currentSearch = search;
      state.main.showFacet = showFacet;
      state.facetResult = res.facets;
      const facets = Facets.processAll(state, state.facetResult['facet_fields']);
      state.facetData = facets['facets'];
      state.filterMaps = facets['filterMaps'];
      state.main.currentStart = parseInt(start);
      state.main.currentPage = parseInt(page);
      
      const input = document.getElementById('text-to-search');
      if (input) {
        input.value = search['main_search'] || '';
      }

      // if a splash page is configured, show it once in place of the search
      // results. We do this here so that at least one search has been run
      // and there's something to put in the facets sidebar.

      if( state['splash'] ) {
        const page = state.pages[state['splash']];
        state['splash'] = null;
        app.innerHTML = Layout(state, Facets.sidebar(state), Page(page));
      } else {
        const results = showFacet ? Facets.focus(state, showFacet) : SearchResults(state);
        app.innerHTML = Layout(state, Facets.sidebar(state), results);
      }
    } else {
      app.innerHTML = Layout(state, '', ViewError(state));
    }
  }
};



module.exports = Router;
