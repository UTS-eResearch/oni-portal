const $ = require("jquery");

const Facets = require('./Facets');
const SearchPath = require('../SearchPath');
const Pagination = require('./Pagination');


const SearchResults = function (data) {
  return `
  <div><br/></div>
  <div class="container col-sm-12 col-xl-9"><div class="row">
    ${Facets(data)}

    ${listDocs(data)}
  <div><br/></div>
  </div></div>
  <div><br/></div>
    ${Pagination(data)}
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

function listDocs (data) {
  var html = '';
  const docs = data.main.docs;
  html = `<ul class="list-group col-sm-8">`;
  if (docs.length > 0) {
    docs.forEach((d) => {
      html += `<li class="list-group-item">${listDoc(data, d)}
        </li>`;
    });
  } else {
    html += `<div class="text-center">No search results</div>`;
  }
  html += '</ul>';
  return html;
};

function listDoc (data, d) {
  const url = `/#view/${d['id']}`;
  const name = d['name'] ? d['name'][0] : '---';
  const facetValues = data.main.resultFacets.map((f) => docFacet(data, f, d[f])).join(' | ');
  const description = d['description'].substr(0, 160) + '...';
  return `<div class="item">
        <div class="item-link"><a href="${url}">${name}</a></div>
        <div class="item-description">${description}</div>
        <div class="item-facets">${facetValues}</div>
        </div>`;
  return html;
};

function docFacet(data, facet, value) {
  return `<a href=${SearchPath.toURI(data.main.currentSearch, { [facet]: value })}>${value}</a>`;
}


module.exports = SearchResults;
