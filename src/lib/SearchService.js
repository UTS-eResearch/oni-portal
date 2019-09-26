const axios = require('axios');

const SearchService = {
  searchAll: async function (config) {
    const req = await axios.get(`${config.api}/select?q=*%3A*`);
    if (req.data) {
      return req.data['response']['docs'];
    } else {
      return [];
    }
  }
};

module.exports = SearchService;