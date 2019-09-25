const axios = require('axios');

const NginxService = async function (config) {
  const req = await axios.get(`${config.uri}/select?q=*%3A*`);
  return req.data;
};

module.exports = NginxService;