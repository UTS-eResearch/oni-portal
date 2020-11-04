const axios = require('axios');


// see https://lucene.apache.org/solr/guide/8_4/the-standard-query-parser.html#the-standard-query-parser

const SOLR_SPECIAL_CHARS = /([+&|!(){}\[\]^"~*?:/'-])/;


// function escapeSolrQuery(raw) {
//   return raw.replace(/(\s|:|%20)/g, "%5C$1");
// }

function escapeSolrQuery(raw) {
  return raw.replace(/SOLR_SPECIAL_CHARS/g, "\\$1");
}


// now escaping the solr query twice: once for solr, and then for URIs


const SolrService = {

  select: async function (config, {start: start, page: page, search: search, showFacet: showFacet}) {
    try {
      var searchParams = config.search.mainSearch + ':*'; // default if search is empty
      if( search && Object.keys(search).length > 0 ) {
        const searches = Object.keys(search).map((k) => {
          if( k === config.search.mainSearch ) {
            return k + ':' + escapeSolrQuery(search[k]);
          } else {
            return k + ':' + '"' + escapeSolrQuery(search[k]) + '"';
          }
        });
        searchParams = searches.join(' && ');
      console.log(`Search params: ${searchParams}`);
      var query = `select?q=${encodeURIComponent(searchParams)}&start=${start}&page=${page}`;

      if( config.facets ) {
        query += `&facet=true&` + facetParams(config, showFacet);
      }

      if( config.results.sort ) {
        query += `&sort=` + sortParam(config.results.sort);
      }

      const url = `${config.apis.solr}/${query}`;

      const res = await axios.get(url);
      if (res.data) {
        return { data: res.data['response'], facets: res.data['facet_counts'], status: res.status};
      } else {
        return { data: [], status: res.status};
      }
    } catch (e) {
      console.log("search error " + e);
      return { data: [], status: e.message };
    }
  }
};

function facetParams(config, showFacet) {
  const params = [ 'facet.limit=' + config.facetLimit ];
  for( var facet of Object.keys(config.facets) ) {
    params.push('facet.field=' + facet);
    const cf = config.facets[facet];
    if( facet === showFacet ) {
      params.push(`f.${facet}.facet.limit=-1`);
    } else if( 'limit' in cf && cf['limit'] !== config.facetLimit ) {
      params.push(`f.${facet}.facet.limit=${cf['limit']}`);
    }
    if( 'sort' in cf ) {
      params.push(`f.${facet}.facet.sort=${cf['sort']}`);
    }
  }
  return params.join('&');
}



function sortParam(cf) {
  return cf.map((sortby) => {
    if( sortby['order'] ) {
      return `${sortby['field']}%20${sortby['order']}`
    } else {
      return sortby['field'];
    }
  }).join(',');
}

module.exports = SolrService;
