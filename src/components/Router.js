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
      let {data, status} = await solrService.get({api: state.config.api}, query);
      if (status === 200) {
        state.main.doc = data;
        //Just to avoid extra ajax calls but we can have multiple relationships here
        if(state.main.doc.record_type_s || state.main.doc.record_type_s === 'Person') {
          //Removing orcid.org to have better matches
          state.main.doc.id = state.main.doc.id.replace("https://orcid.org/", "");
          //state.main.doc.id = encodeURIComponent(state.main.doc.id);
          //state.main.doc.id = encodeURIComponent(state.main.doc.id);
          const res = await solrService.search({api: state.config.api}, {
            start: 0,
            page: 1,
            searchParam: 'author_id%3A',
            text: state.main.doc.id
          });
          if (status === 200) {
            state.main.related = res.data.docs || [];
          }
        }
        app.innerHTML = [Header(state), Search(state), ViewDoc(state), Footer(state)].join('');
      } else {
        app.innerHTML = [Header(state), Search(state), ViewError(state), Footer(state)].join('');
      }
    }
    if (verb === '#search/') {
      //TODO: make this better
      const splits = match[2].split('/');
      const start = splits[0] || state.main.start;
      const page = splits[1] || '';
      let searchText = splits[2] || '';
      const {data, status} = await solrService.search({api: state.config.api}, {
        start: start,
        page: page,
        searchParam: 'main_search%3A',
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
