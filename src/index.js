import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';
const ConfigService = require('./components/ConfigService');
const Router = require('./components/Router');
const RegisterEvents = require('./components/RegisterEvents');

//const config = require('../config.json');
// Main App
async function main() {

  // Default state
  // config is passed through from the oni-express app
  const config = await ConfigService.base();
  // TODO - most of the config in state should be moved out to
  // config.json

  let state = {
    apis: config.apis,
    header: config.header,
    footer: config.footer,
    pages: config.pages,
    search: config.search,
    results: config.results,
    errors: config.errors,
    main: {
      docs: [],
      doc: {},
      start: 0,
      page: 1,
      numFound: 0,
      pageSize: 10,
      searchText: '',
      currentSearch: {},
      related: [],
    },
    facets: config.facets,
    facetData: [],
    facetLimit: 5,
    config: config
  };

  RegisterEvents(state);

  window.onhashchange = main;
  document.title = config.header.title;

  await Router(state);
}

(async () => {
  await main();
})();
