import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';

const axios = require('axios');
const config = require('../config.json');

//App view components
const Router = require('./components/Router');
const RegisterEvents = require('./components/RegisterEvents');



window.onhashchange = main;
document.title = config.header.title;

// Main App
async function main() {
  const res = await axios.get('http://localhost:8080/portalcf/config.json');
  const config = res.data;

  const state = {
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

  await Router(state);
}

(async () => {
  await main();
})();
