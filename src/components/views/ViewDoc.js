const $ = require("jquery");
const ViewTable = require('./ViewTable');
const ViewErrorElement = require('./ViewErrorElement');
const ViewRelated = require('./ViewRelated');
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');
const Facets = require('./Facets');

const ViewDoc = {

  main: function (data) {
    return `

  <div class="col-8">
    <div class="item-link">${data.main.doc.name}</div>
    ${ViewTable(data, data.main.doc, data.results.viewFields).html()}
  </div>
  `;
  },

  summary: function (data) {
    let html = '<div class="col-3 docSummary">';
    let doc = data.main.doc;
    let fields = data.results.summaryFields;
    let facetcf = data.facets;
    for( let fieldcf of fields ) {
      const field = fieldcf['field'];
      const values = Array.isArray(doc[field]) ? doc[field]: [ doc[field] ];
      if( fieldcf['facet'] ) {
        // FIXME use Facets.render(data, facetName, v)
        for( let fv of values.map((v) => Facets.process(data, fieldcf['facet'], v)) ) {
          html += `<div class="summaryField">${Facets.linkProcessed(data, data.facets[fieldcf['facet']], fv)}</div>`
        }
      } else {
        for( let v of values ) {
          html += `<div class="summaryField">${doc[field]}</div>`;
        } 
      }
    }
    html += `<div class="summaryField"><a href="${SearchPath.toURI(data.main.currentSearch)}">&lt; back to search</a></div>
    </div>`
    return html;
  }
};


module.exports = ViewDoc;