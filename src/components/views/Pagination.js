const SearchPath = require('../SearchPath');

const Pagination = function (data) {
  const numFound = data.main.numFound;
  const pageSize = data.main.pageSize;
  const search = data.main.currentSearch || {};
  let start = data.main.start;
  const pages = Math.ceil(numFound / pageSize);

  let html = `
  <div class="container">
    <nav class="d-flex justify-content-center" aria-label="Pagination">
    <ul class="pagination">`;
  for (let p = 1; p < pages + 1; p++) {
    html += `<li class="page-item"><a class="page-link" href="${SearchPath.toURI(search, null, start, p)}">${p}</a></li>`;
    start = (start + pageSize);
  }
  html += `</ul>
  </nav>
  </div>`;

  return html;
}

module.exports = Pagination;