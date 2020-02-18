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
    title: 'Research Data Portal',
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
    searchText: 'Search'
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
      {display: "", field: "licenseOriginal", fieldName: 'Licence'},
      {display: "SubDocDate", field: "datePublished", fieldName: 'Date Published'},
      {display: "SubDoc", field: "contactPoint", fieldName: 'Contact Point', template: '${item.name} ${item.email}'},
    ]
  },
  facets: [
  'Dataset_author_facet',
  'Dataset_keywords_facetmulti',
  'Dataset_FOR_facetmulti'
  ],
  
  facetsDisplay: [
    {name: 'Dataset_author_facet', displayText: 'Authors'},
    {name: 'Dateset_keywords_facetmulti', displayText: 'Keywords'},
    {name: 'Dateset_FOR_facetmulti', displayText: 'FORs'}
  ],
  facetData: [],
  facetLimit: 5,
  footer:{
    text: '2019 University of Technology Sydney'
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
