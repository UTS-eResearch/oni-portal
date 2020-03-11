import 'bootstrap';
import './styles/styles.scss';
import './images/logo.svg';

const config = require('../config.json');

//App view components
const Router = require('./components/Router');
const RegisterEvents = require('./components/RegisterEvents');

// Default state
// config is passed through from the oni-express app

// TODO - most of the config in state should be moved out to 
// config.json

let state = {
  header: config.header,
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
    searchFacets: [
      'Dataset_funder_facetmulti',
      'Dataset_dateCreated_facetmulti',
      'Dataset_affiliation_facetmulti',
      'Dataset_author_facet',
      'Dataset_keywords_facetmulti',
      'Dataset_FOR_facetmulti'
    ],
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
        baseUrl: config.ocfl
      }
    ],
    viewLinks: false
  },

  facets: {
    'Dataset_funder_facetmulti': {
      label: 'Funding scheme',
      field: 'funder'
    },
    'Dataset_dateCreated_facetmulti': {
      label: 'Year',
      field: 'dateCreated'
    },
    'Dataset_affiliation_facetmulti': {
      label: 'School/Dept',
      field: 'affiliation',
      limit: 5
    },
    'Dataset_author_facet': {
      label: 'Author',
      field: 'author',
      limit: 5
    },
    'Dataset_keywords_facetmulti': {
      label: 'Keywords',
      field: 'keywords',
      limit: 5
    },
    'Dataset_FOR_facetmulti': {
      label: 'FORs',
      JSON: true,
      search: '@id',
      display: 'name',
      component: 'FacetFOR',
      field: 'FOR_id',
      limit: 5
    }
  },

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
