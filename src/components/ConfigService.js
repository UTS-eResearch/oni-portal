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
  },
  processStyles: function (styles) {
    //TODO: add more configurable styles
    if(styles.summaryColumn) {
      const colSum = document.documentElement.querySelector('.col-sum');
      colSum.setAttribute("style", `background-color: ${styles.summaryColumn.background}; color: ${styles.summaryColumn.shadow}`);
    }
    if(styles.summary) {
      const summary = document.documentElement.querySelector('.summary');
      summary.setAttribute("style", `background-color: ${styles.summary.background}; color: ${styles.summary.color}`);
      const summaryLink = document.documentElement.querySelectorAll('.summary>a');
      summaryLink.forEach((s) => {
        s.setAttribute("style", `color: ${styles.summary.link}; text-decoration: ${styles.summary.linkUnderline || 'underline'}`);
      });

    }
  }
}

module.exports = ConfigService;
