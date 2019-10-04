const $ = require("jquery");
const ListDocs = require('./ListDocs');
const Pagination = require('./Pagination');

const Main = function (data) {
  let html = `<div><br/></div>`;
  html = [ListDocs(data), '<div><br/></div>' ,Pagination(data)].join('');
  html += `
  <div class="row">
    <div class="container">
      <div class="text-center">
        <p>Results: ${data.main.numFound}</p>
      </div>
    </div>
  </div>
  <div><br/></div>
  `;

  return html;
};

module.exports = Main;
