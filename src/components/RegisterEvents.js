const Header = require('./views/header');
const Main = require('./views/main');
const Footer = require('./views/footer');
const Search = require('./views/search');
const ViewDoc = require('./views/ViewDoc');
const ViewError = require('./views/ViewError');
const delegate = require('./Delegate');
const solrService = require('./SolrService');

const RegisterEvents = function (state) {
  const renderApp = function (data, into) {
    into.innerHTML = [Header(data), Search(data), Main(data), Footer(data)].join('');
  };

  const app = document.querySelector('#app');

  delegate('#app', 'click', '#search-text', async () => {
    const search = document.querySelector('#text-to-search');
    const {data, status} = await solrService.search({api: state.config.api}, search.value);
    state.main.docs = data.docs;
    state.main.numFound = data.numFound;
    renderApp(state, app);
  });

  delegate('#app', 'keyup', '#text-to-search', async (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const search = document.querySelector('#text-to-search');
      const {data, status} = await solrService.search({api: state.config.api}, search.value);
      state.main.docs = data.docs;
      state.main.numFound = data.numFound;
      renderApp(state, app);
    }
  });

  delegate('#app', 'click', '#search-text-1', async () => {
    const search = document.querySelector('#text-to-search');
    const {data, status} = await solrService.search({api: state.config.api}, search.value);
    state.main.docs = data;
    renderApp(state, app);
  });
};

module.exports = RegisterEvents;