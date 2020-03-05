const $ = require("jquery");
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');


function renderFacet(data, facetName, focus) {
  const facet = data.facets[facetName];
  const values = data.facetData[facetName].filter((v)=>v['count'] > 0);

  let focusLink = focus ? SearchPath.toURI({}, { showFacet: facetName }) : null;
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
    console.log(`facetData ${JSON.stringify(data.facetData)}`);
    console.log(`searchFacets ${JSON.stringify(data.main.searchFacets)}`);
    if(isIterable(data.main.searchFacets) ){
      html = `<ul class="list-group col-3">`;
      for(let facetName of data.main.searchFacets ) {
        console.log("facet " + facetName);
        if( ! data.main.showFacet || facetName !== data.main.showFacet ) {
          html += renderFacet(data, facetName, true);
        }
      }
      html += `</ul>`;
    }
  return html;
  },

  focus: function(data, showFacet) {
    if( showFacet in data.facets ) {
      let html = `<ul class="list-group col-9">`;
      html += renderFacet(data, data.facets[showFacet], false);
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
