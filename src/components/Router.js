const Header = require('./header');
const Main = require('./main');
const Footer = require('./footer');
const Search = require('./search');
const ViewDoc = require('./ViewDoc');
const ViewError = require('./ViewError');
const solrService = require('../lib/SolrService');

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
  } else {
    const {data, status} = await solrService.searchAll({api: state.config.api});
    if (status === 200) {
      state.main.docs = data;
      app.innerHTML = [Header(state), Search(state), Main(state), Footer(state)].join('');
    } else {
      app.innerHTML = [Header(state), Search(state), ViewError(state), Footer(state)].join('');
    }
  }
};

module.exports = Router;
