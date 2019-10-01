const ListDocs = require('./ListDocs');

const Main = function (data) {

  let html = '';

  html = [ListDocs(data)].join('');

  return html;
};

module.exports = Main;