import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';

const Delegate = require('./lib/Delegate');
const searchService = require('./lib/SearchService');

const config = require('../config.json');

//App view components
const Header = require('./components/header');
const Main = require('./components/main');
const Footer = require('./components/footer');
const Search = require('./components/search');

//Default state
let state = {
  header: {
    title: 'Data Portal',
    URL: '/',
    logo: 'assets/mint.svg',
    help: 'help',
    helpURL: '',
    portal: 'Back to Stash',
    portalURL: 'http://stash.research.uts.edu.au',
    menu: [
      {id: 'back', name: 'Back'}
    ]
  },
  search:{
    error: 'Search Error',
    invalidSearch: 'Invalid Search',
    searchText: 'Search'
  },
  main: {
    docs: []
  },
  config: config
};

const app = document.querySelector('#app');

const renderApp = function (data, into) {
  console.log('rendering')
  into.innerHTML = [Header(data), Search(data), Main(data), Footer(data)].join('');
};

(async () => {

  state.main.docs = await searchService.searchAll({api: config.api});

  renderApp(state, app);

})();