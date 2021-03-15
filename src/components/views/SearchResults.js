const $ = require("jquery");

const Facets = require('./Facets');
const SearchPath = require('../SearchPath');
const Pagination = require('./Pagination');

const Geo = require('./Geo');

const SearchResults = function (data) {
  return `

    ${listDocs(data)}

    ${Pagination(data)}

    <div class="container">
      <div class="d-flex justify-content-center">
        <p>Results: ${data.main.numFound}</p>
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

    if( data.results['map'] ) {
      console.log("adding map holder to list of results");
      html += `<li class="list-group-item">${Geo.mapHolder()}</li>`;
    }

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
  const encID = encodeURIComponent(d['id']);
  const url = '/#view/' + encID;
  const name = d['name'] ? d['name'][0] : '---';
  const facetValues = docFacets(data, d).join(' | ');
  const description = d['description'] || '';

  return `<div class="item">
        <div class="item-link"><a href="${url}">${name}</a></div>
        <div class="item-description">${description}</div>
        <div class="item-facets">${facetValues}</div>
        </div>`;
  return html;
};


function docFacets (data, d) {
  const facetLinks = [];
  for( let facet of data.results.resultFacets ) {
    if( d[facet] ) {
      if( Array.isArray(d[facet]) ) {
        facetLinks.push(...d[facet].map((v) => Facets.link(data, facet, v)));
      } else{
        facetLinks.push(Facets.link(data, facet, d[facet]));
      }
    }
  }
  return facetLinks;
}


module.exports = SearchResults;
