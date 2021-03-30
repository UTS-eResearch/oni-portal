const axios = require('axios');

function escapeSolrQuery(raw) {
  // see https://lucene.apache.org/solr/guide/8_4/the-standard-query-parser.html#the-standard-query-parser
  const SOLR_SPECIAL_CHARS = /([+&|!(){}\[\]^"~*?:/'-])/;
  const regex = new RegExp(SOLR_SPECIAL_CHARS);
  return raw.replace(regex, "\\$1");
}


const SolrService = {

  select: async function (config, {start: start, page: page, search: search, showFacet: showFacet}) {
    try {
      let searchParams = config.search.mainSearch + ':*'; // default if search is empty
      if( search && Object.keys(search).length > 0 ) {
        const searches = Object.keys(search).map((k) => {
          if( k === config.search.mainSearch ) {
            return k + ':' + escapeSolrQuery(search[k]);
          } else {
            return k + ':' + '"' + escapeSolrQuery(search[k]) + '"';
          }
        });
        searchParams = searches.join(' && ')
      }
      searchParams = encodeURIComponent(searchParams);
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
        console.log(`Got solr data back: ${res.status} ${res.data['response']['numFound']}`);
        return { data: res.data['response'], facets: res.data['facet_counts'], status: res.status};
      } else {
        console.log(`Got NO solr data back: ${res.status}`);
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
