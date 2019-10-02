const Header = require('./views/header');
const Main = require('./views/main');
const Footer = require('./views/footer');
const Search = require('./views/search');
const ViewDoc = require('./views/ViewDoc');
const ViewError = require('./views/ViewError');
const solrService = require('./SolrService');

const Router = async function (state) {
  const route = window.location.hash;
  const app = document.querySelector('#app');

  if (route) {
    const match = route.match(/(#.*?\/)(.*)/);
    const verb = match[1];
    const query = match[2];
    if (verb === '#view/') {
      const {data, status} = await solrService.get({api: state.config.api}, query);
      if (status === 200) {
        state.main.doc = data;
        app.innerHTML = [Header(state), Search(state), ViewDoc(state), Footer(state)].join('');
      } else {
        app.innerHTML = [Header(state), Search(state), ViewError(state), Footer(state)].join('');
      }
    }
    if (verb === '#search/') {
      const splits = match[2].split('/');
      const start = splits[0] || state.main.start;
      const page = splits[1] || '';
      const searchText = splits[2] || '';
      const {data, status} = await solrService.search({api: state.config.api}, {
        start: start,
        page: page,
        text: searchText
      });
      if (status === 200) {
        state.main.docs = data.docs;
        state.main.numFound = data.numFound;
        state.main.searchText = searchText;
        app.innerHTML = [Header(state), Search(state), Main(state), Footer(state)].join('');
        const input = document.getElementById('text-to-search');
        if (input) {
          input.value = searchText;
        }
      } else {
        app.innerHTML = [Header(state), Search(state), ViewError(state), Footer(state)].join('');
      }
    }
  } else {
    const {data, status} = await solrService.searchAll({api: state.config.api});
    if (status === 200) {
      state.main.docs = data.docs;
      state.main.numFound = data.numFound;
      state.main.searchText = '';
      app.innerHTML = [Header(state), Search(state), Main(state), Footer(state)].join('');
    } else {
      app.innerHTML = [Header(state), Search(state), ViewError(state), Footer(state)].join('');
    }
  }
};

module.exports = Router;
