const $ = require("jquery");
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');


function renderFacet(data, facet, focus) {
  const values = data.facetData[facet.name].filter((v)=>v['count'] > 0);

  let focusLink = focus ? SearchPath.toURI({}, { showFacet: facet.name }) : null;
  let html = `<li class="list-group-item">
  <div>
    <div class="facetLabel">${facet.label}</div>
        <ul class="list-group">`;
  if(isIterable(values)) { 
    for(let f of values ){       
      html += `<li class="facet">${Facets.link(data, facet, f)} (${f['count']})</span></li>\n`;
    }
  }
 
 if( focusLink ) {
    html += `<li class="facet"><a href="${focusLink}">more...</a></li>`;
  }

  html += `</ul>
   </div>
  </li>`
  return html;
}



const Facets = {

  sidebar: function (data) {
    let html = '';
    if(isIterable(data.facets) ){
      html = `<ul class="list-group col-3">`;
      for(let facet of data.facets) {
        if( ! data.main.showFacet || facet.name !== data.main.showFacet ) {
          html += renderFacet(data, facet, true);
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
      html += renderFacet(data, facets[0], false);
      html += `</ul>`;
      return html;
    } else {
      return `<p>Facet ${showFacet} not found</p>`;
    }
  },

  link: function(data, facet, f) {
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
};

module.exports = Facets;
