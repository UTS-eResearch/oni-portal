import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';

const ConfigService = require('./components/ConfigService');
const Router = require('./components/Router');
const RegisterEvents = require('./components/RegisterEvents');

const CFSECTIONS = [
  'apis', 'header', 'footer', 'pages', 'splash', 'search', 'results', 'facets', 'errors'
];

const state = {
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
  facetData: [],
  facetLimit: 5
};

window.onhashchange = main;


// this is called every time the # part of the URL updates

async function main() {
  await Router(state);
}


// do the async operation to load the config, put it into the state hash,
// register events and then call main to draw the page the first time.

(async () => {
  const config = await ConfigService.base();
   for( let cf of CFSECTIONS ) {
    if( config[cf] ) {
      state[cf] = config[cf];
    }
  }
  state['config'] = config;

  RegisterEvents(state);
  document.title = config.header.title;

  await main();
  if(config.styles) {
    ConfigService.processStyles(config.styles);
  }
})();
