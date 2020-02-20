import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';

const config = require('../config.json');

//App view components
const Router = require('./components/Router');
const RegisterEvents = require('./components/RegisterEvents');

//Default state
let state = {
  header: {
    title: 'Successful Grants',
    URL: '/',
    logo: 'images/logo.svg',
    help: 'Help',
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
    searchText: 'Search',
    mainSearch: 'main_search'
  },
  main: {
    docs: [],
    doc: {},
    start: 0,
    page: 1,
    numFound: 0,
    pageSize: 10,
    searchText: '',
    related: [],
    viewFields: [
      {display: "SubDocHorizontal", field: "author", fieldName: 'Author/s'},
      {display: "SubDoc", field: "html", fieldName: "Grant", template: "item['@id']" }
    ]
  },

  facets: [
    {
      name: 'Dataset_author_facet',
      label: 'Author',
      field: 'author',
      JSON: false
    },
    {
      name: 'Dataset_keywords_facetmulti',
      label: 'Keywords',
      field: 'keywords',
      JSON: false
    },
    {
      name: 'Dataset_FOR_facetmulti',
      label: 'FORs',
      JSON: true,
      search: '@id',
      display: 'name',
      field: 'FOR_id'
    }
  ],

  facetData: [],
  facetLimit: 5,
  footer:{
    text: '2020 University of Technology Sydney'
  },
  config: config
};

RegisterEvents(state);

window.onhashchange = main;

// Main App
async function main() {
  await Router(state);
}

(async () => {
  await main();
})();
