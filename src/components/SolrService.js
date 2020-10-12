const axios = require('axios');


// Note: this only escapes spaces and : because I didn't want to deal with
// the messiness of the entire solr special character set
// see https://lucene.apache.org/solr/guide/8_4/the-standard-query-parser.html#the-standard-query-parser

function escapeSolrQuery(raw) {
  return raw.replace(/(\s|:|%20)/g, "%5C$1");
}


const SolrService = {

  select: async function (config, {start: start, page: page, search: search, showFacet: showFacet}) {
    try {
      var searchParams = config.search.mainSearch + '%3A*'; // default if search is empty
      if( search && Object.keys(search).length > 0 ) {
        const searches = Object.keys(search).map((k) => {
          if( k === config.search.mainSearch ) {
            return k + '%3A' + escapeSolrQuery(search[k]);
          } else {
            return k + '%3A' + '"' + escapeSolrQuery(search[k]) + '"';
          }
        });
        searchParams = searches.join('%20%26%26%20');
        // join search clauses together with ' && ' %26%26
      }
      var query = `select?q=${searchParams}&start=${start}&page=${page}`;

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
