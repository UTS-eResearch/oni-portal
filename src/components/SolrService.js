const axios = require('axios');

const SolrService = {
  searchAll: async function (config) {
    try {
      const req = await axios.get(`${config.api}/select?q=*%3A*`);
      if (req.data) {
        return {data: req.data['response'], status: req.status};
      } else {
        return {data: [], status: req.status};
      }
    } catch (e) {
      return {data: [], status: e.message};
    }
  },
  get: async function (config, data) {
    try {
      let param = `get?id=`;
      //Twice encoded, once for html one for solr
      data = encodeURIComponent(`${data}`);
      const req = await axios.get(`${config.api}/${param}${data}`);
      if (req.data) {
        return {data: req.data['doc'], status: req.status};
      } else {
        return {data: {}, status: req.status};
      }
    } catch (e) {
      return {data: {}, status: e.message};
    }
  },
  search: async function (config, {start: start, page: page, text: text}) {
    try {
      let param = `select?q=main_search%3A`;
      //Twice encoded, once for html one for solr
      let data = encodeURIComponent(`${text}`);
      data = encodeURIComponent(`${text}`);
      if (text === '' || !text) {
        data = '*';
      }
      const req = await axios.get(`${config.api}/${param}${data}&start=${start}&page=${page}`);
      if (req.data) {
        return {data: req.data['response'], status: req.status};
      } else {
        return {data: [], status: req.status};
      }
    } catch (e) {
      return {data: [], status: e.message};
    }
  }
};

module.exports = SolrService;