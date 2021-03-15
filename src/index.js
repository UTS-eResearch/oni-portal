import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';


import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const ConfigService = require('./components/ConfigService');
//App view components
const Router = require('./components/Router');
const RegisterEvents = require('./components/RegisterEvents');

// Main App
async function main() {
  // Default state
  // config is passed through from the oni-express app
  const config = await ConfigService.base();

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

  if( config.splash ) {
    state.splash = config.splash;
  }

  RegisterEvents(state);

  window.onhashchange = main;
  document.title = config.header.title;

  await Router(state);
}

(async () => {
  await main();
})();
