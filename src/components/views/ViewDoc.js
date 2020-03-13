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
    ${ViewTable(data, data.main.doc, data.results.viewFields).html()}
  </div>
  </div>
  </div>
  `;
};




function summary(data) {
  let html = '';
  let doc = data.main.doc;
  let fields = data.results.summaryFields;
  let facetcf = data.facets;
  for( let fieldcf of fields ) {
    const field = fieldcf['field'];
    const values = Array.isArray(doc[field]) ? doc[field]: [ doc[field] ];
    if( fieldcf['facet'] ) {
      for( let fv of values.map((v) => Facets.process(data, fieldcf['facet'], v)) ) {
        console.log(`Summary facet link ${JSON.stringify(fv)}`);
        html += `<div class="summaryField">${Facets.link(data, data.facets[fieldcf['facet']], fv)}</div>`
      }
    } else {
      for( let v of values ) {
        html += `<div class="summaryField">${doc[field]}</div>`;
      } 
    }
  }
  return html;
}


module.exports = ViewDoc;