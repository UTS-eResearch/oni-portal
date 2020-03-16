const axios = require('axios');


// Note: this only escapes spaces and : because I didn't want to deal with
// the messiness of the entire solr special character set
// see https://lucene.apache.org/solr/guide/8_4/the-standard-query-parser.html#the-standard-query-parser

function escapeSolrQuery(raw) {
  return raw.replace(/(\s|:|%20)/g, "%5C$1");
}


const SolrService = {

  select: async function (config, {start: start, page: page, search: search, facets: facets, facetLimit: facetLimit, facetViewAll: facetViewAll}) {
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

      if(facets) {
        query += `&facet=true&facet.field=${[...facets].join('&facet.field=')}&facet.limit=${facetLimit || 5}`;
        if( facetViewAll ) {
          // remove the facet limit if we're viewing one facet 
          query += `&f.${facetViewAll}.facet.limit=-1`;
        }
      }

      const res = await axios.get(`${config.apis.solr}/${query}`);
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

module.exports = SolrService;
