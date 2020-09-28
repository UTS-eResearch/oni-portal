const axios = require('axios');

const ConfigService = {

  base: async function baseConfig() {
    try {
      const url = '/config/portal';
      const config = await axios.get(url);
      return config['data'];
    } catch (e) {
      console.log("base config error " + e);
      return {};
    }
  }
}

module.exports = ConfigService;
