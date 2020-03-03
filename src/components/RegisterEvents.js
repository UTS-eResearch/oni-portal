const delegate = require('./Delegate');

const SearchPath = require('./SearchPath');

const RegisterEvents = function (state) {

  delegate('#app', 'click', '#search-text', async () => {
    const search = document.querySelector('#text-to-search');
    window.location.hash = SearchPath.toURI(state.main.currentSearch, { 'main_search': search.value }).substr(1);
  });

  delegate('#app', 'keyup', '#text-to-search', async (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const search = document.querySelector('#text-to-search');
      window.location.hash = SearchPath.toURI(state.main.currentSearch, { 'main_search': search.value }).substr(1);
    }
  });

};

module.exports = RegisterEvents;