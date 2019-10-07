const $ = require("jquery");
const ListDocs = require('./ListDocs');
const Pagination = require('./Pagination');

const Main = function (data) {
  return `
  <div><br/></div>  
    ${[ListDocs(data), '<div><br/></div>', Pagination(data)].join('')}
    <div class="row">
      <div class="container">
        <div class="text-center">
          <p>Results: ${data.main.numFound}</p>
      </div>
    </div>
  </div>
  <div><br/></div>
  `;
};

module.exports = Main;
