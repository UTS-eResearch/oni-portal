const Pagination = function (data) {
  const numFound = data.main.numFound;
  const pageSize = data.main.pageSize;
  const searchText = data.main.searchText || '';
  let start = data.main.start;
  const pages = Math.ceil(numFound / pageSize);

  let html = `
  <div class="container">
    <nav class="d-flex justify-content-center" aria-label="Pagination">
    <ul class="pagination">`;
  for (let x = 1; x < pages + 1; x++) {
    html += `<li class="page-item"><a class="page-link" href="#search/${start}/${x}/${searchText}">${x}</a></li>`;
    start = (start + pageSize);
  }
  html += `</ul>
  </nav>
  </div>`;

  return html;
}

module.exports = Pagination;