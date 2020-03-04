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
    solrUrl: config.solr,
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
    currentSearch: {},
    related: [],
    resultFacets: [
      'Dataset_funder_facetmulti',
      'Dataset_dateCreated_facetmulti',
      'Dataset_author_facet',
      'Dataset_affiliation_facetmulti'
    ],
    summaryFields: [
      {
        field: 'funder',
        facet: 'Dataset_funder_facetmulti'
      },
      { 
        field: 'dateCreated',
        facet: 'Dataset_dateCreated_facetmulti'
      },
      {
        field: 'author',
        facet: 'Dataset_author_facet'
      },
      {
        field: 'affiliation',
        facet: 'Dataset_affiliation_facetmulti'
      },
      {
        field: 'description'
      },
      {
        field: 'FOR',
        facet: 'Dataset_FOR_facetmulti'
      }
    ],
    viewFields: [
      {
        display: "SubDocIframe",
        field: "html",
        fieldName: "",
        width: "800",
        height: "11300",
        baseUrl: config.repo
      }
    ],
    viewLinks: false
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
      label: 'Year',
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
