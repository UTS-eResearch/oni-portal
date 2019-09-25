import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';

const Delegate = require('./lib/Delegate');
const nginxService = require('./lib/NginxService');

const config = require('../config.json');

//App view components
const Header = require('./components/header');
const Main = require('./components/main');

//Default state
let state = {
  header: {
    title: 'Data Portal',
    menu: [
      {id: 'sign-out-header', name: 'Sign Out'}
    ]
  },
  main: {
    docs: []
  }
};

const app = document.querySelector('#app');

const renderApp = function (data, into) {
  console.log('rendering')
  into.innerHTML = [Header(data), Main(data)].join('');
};

const renderLoading = function () {
  let loading = `
    <section class="center">
    <div>loading</div>
    </section>
    `
  state.main = loading;
  renderApp(state, app)
};

(async () => {
  const res = await nginxService({uri: '/solr/ocflcore'});
  state.main.docs = res['response']['docs'];
  console.log(state);
  renderApp(state, app);

})();