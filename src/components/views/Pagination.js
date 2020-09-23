const SearchPath = require('../SearchPath');

const Pagination = function (data) {
  const numFound = data.main.numFound;
  const pageSize = data.main.pageSize;
  const search = data.main.currentSearch || {};
  let start = data.main.start;
  let maxPage = 5;
  //Quick fix below: I wonder if this above could be more dynamic
  if (window.window.innerWidth > 500) {
    maxPage = 10;
  }
  const totalPages = Math.ceil(numFound / pageSize);
  const totalPage = totalPages < maxPage ? totalPages : maxPage;
  let page = 1;
  if (data.main.currentPage) {
    page = data.main.currentPage;
  }
  let nextPage = page;
  if (data.main.currentPage === page) {
    nextPage = page + 1;
  }
  if (data.main.currentStart) {
    start = data.main.currentStart;
  }
  let html = `
  <div class="container">
    <nav class="d-flex justify-content-center" aria-label="Pagination">
    <ul class="pagination">`;
  if (start !== 0) {
    html += `<li class="page-item"><a class="page-link" href="${SearchPath.toURI(search, null, 0, 1)}"><<</a></li>`;
  }
  let currentStart = start;
  const backStart = currentStart - pageSize;
  const backPage = page - 1;
  if (backStart >= 0 && backPage >= 0) {
    html += `<li class="page-item"><a class="page-link" href="${SearchPath.toURI(search, null, backStart, backPage)}"><</a></li>`;
  }
  for (let p = 0; p < totalPage; p++) {
    if (numFound > currentStart) {
      html += `<li class="page-item ${data.main.currentPage === page ? 'disabled' : ''}"><a class="page-link" href="${SearchPath.toURI(search, null, currentStart, page)}">${page}</a></li>`;
    }
    page++;
    currentStart = (currentStart + pageSize);
  }
  if (numFound > currentStart) {
    html += `<li class="page-item"><a class="page-link" href="${SearchPath.toURI(search, null, start + pageSize, nextPage)}">></a></li>`;
    html += `<li class="page-item"><a class="page-link" href="${SearchPath.toURI(search, null, numFound - pageSize, totalPages - 3)}">>></a></li>`;
  }
  html += `</ul>
  </nav>
  </div>`;

  return html;
}

module.exports = Pagination;
