import * as $ from 'jquery';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';

const delegate = require('./lib/Delegate');
const solrService = require('./lib/SolrService');

const config = require('../config.json');

//App view components
const Header = require('./components/header');
const Main = require('./components/main');
const Footer = require('./components/footer');
const Search = require('./components/search');
const Router = require('./components/Router');

//Default state
let state = {
  header: {
    title: 'Data Portal',
    URL: '/',
    logo: 'images/logo.svg',
    help: 'help',
    helpURL: '',
    portal: 'Back to Stash',
    portalURL: 'http://stash.research.uts.edu.au',
    menu: [
      {id: 'back', name: 'Back'}
    ]
  },
  search: {
    error: 'Search Error',
    invalidSearch: 'Invalid Search',
    searchText: 'Search'
  },
  main: {
    docs: []
  },
  config: config
};

const renderApp = function (data, into) {
  into.innerHTML = [Header(data), Search(data), Main(data), Footer(data)].join('');
};

const app = document.querySelector('#app');

// Register Events

delegate('#app', 'click', '#search-text', async () => {
  const search = document.querySelector('#text-to-search');
  const {data, status} = await solrService.search({api: state.config.api}, search.value);
  state.main.docs = data;
  renderApp(state, app);
});

delegate('#app', 'keyup', '#text-to-search', async (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const search = document.querySelector('#text-to-search');
    const {data, status} = await solrService.search({api: state.config.api}, search.value);
    state.main.docs = data;
    renderApp(state, app);
  }
});

delegate('#app', 'click', '#search-text-1', async () => {
  const search = document.querySelector('#text-to-search');
  const {data, status} = await solrService.search({api: state.config.api}, search.value);
  state.main.docs = data;
  renderApp(state, app);
});

window.onhashchange = main;

// Main App
async function main() {
  await Router(state);
}

(async () => {
  await main();
})();
