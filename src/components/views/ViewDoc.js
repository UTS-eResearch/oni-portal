const $ = require("jquery");
const ViewTable = require('./ViewTable');
const ViewErrorElement = require('./ViewErrorElement');
const ViewRelated = require('./ViewRelated');
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');
const Facets = require('./Facets');

const ViewDoc = function (data) {
  return `
  <div><br/></div>
  <div class="container col-sm-12 col-xl-9"><div class="row">
  <div class="col-3 docSummary">
    ${summary(data)}
    <div class="summaryField"><a href="${SearchPath.toURI(data.main.currentSearch)}">&lt; back to search</a></div>
  </div>

  <div class="col-8">
    <div class="item-link">${data.main.doc.name}</div>
    ${ViewTable(data.main.doc, data.main.viewFields).html()}
  </div>
  </div>
  </div>
  `;
};


// duplicated from FacetController - fixme

function tryJSON(value) {
  try {
    return JSON.parse(value);
  } catch(e) {
    console.error(e);
    return null;
  }
}



function summary(data) {
  let html = '';
  let doc = data.main.doc;
  let fields = data.main.summaryFields;
  let facetcf = data.main.facetsByName;
  for( let fieldcf of fields ) {
    const field = fieldcf['field'];
    const values = Array.isArray(doc[field]) ? doc[field]: [ doc[field] ];
    if( fieldcf['facet'] ) {
      const facet = facetcf[fieldcf['facet']];
      for( v of values ) {
        if( facet['JSON'] ) {
          const j = tryJSON(v);
          const value = {
            value: j[facet['display']],
            search: j[facet['search']]
          }
          html += `<div class="summaryField">${Facets.link(data, facet, value)}</div>`;
        } else {
          html += `<div class="summaryField">${Facets.link(data, facet, { value: v, search: v })}</div>`;          
        }
      }
    } else {
      for( v of values ) {
        html += `<div class="summaryField">${doc[field]}</div>`;
      } 
    }
  }
  return html;
}


module.exports = ViewDoc;