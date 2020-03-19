const $ = require("jquery");

const Facets = require('./Facets');
const SearchPath = require('../SearchPath');
const Pagination = require('./Pagination');


const SearchResults = function (data) {
  return `

    ${listDocs(data)}

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
  const facetValues = data.results.resultFacets.map((f) => docFacet(data, f, d[f])).join(' | ');
  const description = d['description'];
  return `<div class="item">
        <div class="item-link"><a href="${url}">${name}</a></div>
        <div class="item-description">${description}</div>
        <div class="item-facets">${facetValues}</div>
        </div>`;
  return html;
};

function docFacet(data, facet, value) {
  return `<a href=${SearchPath.toURI({}, { [data.facets[facet].field]: value })}>${value}</a>`;
}


module.exports = SearchResults;
