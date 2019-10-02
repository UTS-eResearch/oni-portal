const delegate = require('./Delegate');

const RegisterEvents = function (state) {

  delegate('#app', 'click', '#search-text', async () => {
    const search = document.querySelector('#text-to-search');
    window.location.hash = `#search/${state.main.start}/${state.main.page}/${search.value}`;
  });

  delegate('#app', 'keyup', '#text-to-search', async (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const search = document.querySelector('#text-to-search');
      window.location.hash = `#search/${state.main.start}/${state.main.page}/${search.value}`;
    }
  });

  delegate('#app', 'click', '#search-text-1', async () => {
    const search = document.querySelector('#text-to-search');
    window.location.hash = `#search/${state.main.start}/${state.main.page}/${search.value}`;
  });
};

module.exports = RegisterEvents;