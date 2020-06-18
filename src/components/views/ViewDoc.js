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
    <p>Hi - has this updated?</p>
    ${ViewDoc.link(data, data.main.doc)}
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
        for( let facetLink of values.map((v) => Facets.link(data, fieldcf['facet'], v)) ) {
          html += `<div class="summaryField">${facetLink}</div>`
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
  },

  link: function (data, doc) {

    if( data.config.results.viewLinks ) {
      let html = '<div class="col-3 docLink">';
      const linkText = data.config.results.linkText || 'Dataset';
      if (isIterable(doc['uri_id'])) {
        for (let uri_id of doc['uri_id']) {
          html += `<a class="link" target="blank" href="${data.config.apis.ocfl}/${uri_id}/">${linkText}</a>`;
        }
      } else {
        console.log("Error making link: no uri_id");
        html += "---";
      }
      html += "</div>";
      console.log(`returning ${html}`);
      return html;
    } else {
      return '';
      console.log(`returning nothing`);
    }
  }

};


module.exports = ViewDoc;