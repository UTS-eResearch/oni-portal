const $ = require("jquery");
const ListDocs = require('./ListDocs');
const Pagination = require('./Pagination');

const Main = function (data) {
  let html = '';
  html = [ListDocs(data), Pagination(data)].join('');

  html += `<div class="container">
  <div class="text-center">
  <p>Results: ${data.main.numFound}</p>
  </div>`;

  return html;
};

module.exports = Main;