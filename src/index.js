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
      {
        display: "SubDoc", field: "author", fieldName: 'Author', template: "${item.value[0]}"
      },
      {
        display: "SubDocIframe",
        field: "html",
        fieldName: "Application",
        width: "1000",
        height: "400",
        baseUrl: "http://localhost:8089/grants"
      }
      ]
  },

  facets: [
    {
      name: 'Dataset_funder_facetmulti',
      label: 'Funding scheme',
      field: 'funder',
      JSON: false
    },
    {
      name: 'Dataset_dateCreated_facetmulti',
      label: 'year',
      field: 'dateCreated',
      JSON: false
    },
    {
      name: 'Dataset_affiliation_facetmulti',
      label: 'School/Dept',
      field: 'affiliation',
      JSON: false
    },
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
      display_re: /^(\d+)\s*-\s*(.*)$/,
      component: 'FacetFOR',
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
