const $ = require("jquery");
const ListDocs = require('./ListDocs');

const Main = function (data) {
  let html = '';
  html = [ListDocs(data)].join('');

  html += `<div class="container">
  <br/>
  <div class="text-center">
  <p>Results: ${data.main.numFound}</p>
  </div>`;

  return html;
};

module.exports = Main;