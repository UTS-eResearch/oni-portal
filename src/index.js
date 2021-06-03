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
})();
