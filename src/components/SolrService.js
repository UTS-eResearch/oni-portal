const axios = require('axios');


// Note: this only escapes spaces and : because I didn't want to deal with
// the messiness of the entire solr special character set
// see https://lucene.apache.org/solr/guide/8_4/the-standard-query-parser.html#the-standard-query-parser

function escapeSolrQuery(raw) {
  return raw.replace(/(\s|:|%20)/g, "%5C$1");
}


const SolrService = {

  select: async function (config, {start: start, page: page, searchParam: searchParam, text: text, facets: facets, facetLimit: facetLimit}) {
    try {
      let param = `select?q=`;      
      if (text === '' || !text ) {
        text = '*';
      }
      let escSearch = searchParam + '%3A' + escapeSolrQuery(text);
      let query = `${param}${escSearch}&start=${start}&page=${page}`;

      if(facets) {
        query += `&facet=true%20&facet.field=${[...facets].join('&facet.field=')}&facet.limit=${facetLimit || 5}`;
      }
      const res = await axios.get(`${config.api}/${query}`);
      if (res.data) {
        return {data: res.data['response'], facets: res.data['facet_counts'], status: res.status};
      } else {
        return {data: [], status: res.status};
      }
    } catch (e) {
      return {data: [], status: e.message};
    }
  }
};

module.exports = SolrService;
