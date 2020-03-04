const $ = require("jquery");
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');


function renderFacet(data, facet) {
  const values = data.facetData[facet.name].filter((v)=>v['count'] > 0);
  html = `<li class="list-group-item">
  <div>
    <h4>${facet.label}</h4>
    <hr/>
    <ul class="list-group">`;
  if(isIterable(values)) { 
    for(let f of values ){       
      html += `<li class="row">${facetLink(data, facet, f)} (${f['count']})</span></li>\n`;
    }
  }
  html += `</ul>
  </div>
  </li>`
  return html;
}


function facetLink(data, facet, f) {
  const url = SearchPath.toURI(data.main.currentSearch, { [facet['field']]: f['search'] } );

  if( facet['display_re'] ) {
    const m = f['value'].match(facet['display_re']);
    if( m ) {
      return `<a href="${url}" title="${m[2]}">${m[1]}</a>`;
    } else {
      console.log("no match!");
    }
  }
  return `<a href="${url}">${f['value']}</a>`;
}

const Facets = {

  sidebar: function (data) {
    let html = '';
    if(isIterable(data.facets) ){
      html = `<ul class="list-group col-3">`;
      for(let facet of data.facets) {
        if( ! data.main.showFacet || facet.name !== data.main.showFacet ) {
          html += renderFacet(data, facet);
        }
      }
      html += `</ul>`;
    }
  return html;
  },

  focus: function(data, showFacet) {
    const facets = data.facets.filter((f) => f.name === showFacet);
    if( facets.length > 0 ) {
      let html = `<ul class="list-group col-9">`;
      html += renderFacet(data, facets[0]);
      html += `</ul>`;
      return html;
    } else {
      return `<p>Facet ${showFacet} not found</p>`;
    }
  }

};

module.exports = Facets;
