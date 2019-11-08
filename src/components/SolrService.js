const axios = require('axios');

const SolrService = {
  get: async function (config, data) {
    try {
      let param = `get?id=`;
      data = encodeURIComponent(data);
      const res = await axios.get(`${config.api}/${param}${data}`);
      if (res.data) {
        return {data: res.data['doc'], status: res.status};
      } else {
        return {data: {}, status: res.status};
      }
    } catch (e) {
      return {data: {}, status: e.message};
    }
  },
  search: async function (config, {start: start, page: page, searchParam: searchParam, text: text, facets: facets, facetLimit: facetLimit}) {
    try {
      let param = `select?q=`;      
      if (text === '' || !text ) {
        text = '*';
      }
      let escText = text.replace(':', "\\:");
      let query = `${param}${searchParam}${escText}&start=${start}&page=${page}`;

      if(facets) {
        query += `&facet=true%20&facet.field=${[...facets].join('&facet.field')}&facet.limit=${facetLimit || 5}`;
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
