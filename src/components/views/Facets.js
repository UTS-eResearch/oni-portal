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


function processFacet(cf, raw, count) {
  if( cf['JSON'] ) {
    const value = tryJSON(raw);
    if( value ) {
      return {
        value: value[cf['display']],
        search: value[cf['search']],
        field: cf['field'],
        count: count
      }
    } else {
      return {
        value: '---',
        search: '',
        field: '',
        count: count
      }
    }  
  } else {
    return {
      value: raw,
      search: raw,
      field: cf['field'],
      count: count
    }
  }
}


function tryJSON(value) {
  try {
    return JSON.parse(value);
  } catch(e) {
    console.error("Facet parse error " + e);
    return  null;
  }
}



const Facets = {

  process: function (data, facetName, raw) {
    return processFacet(data.facets[facetName], raw);
  },

  // TODO - stash facet maps at this stage

  processAll: function(data, solrFacets) {
    const facets = {};
    for( let facetName in solrFacets ) {
      facets[facetName] = [];
      for( let i = 0; i < solrFacets[facetName].length; i += 2 ) {
        const raw = solrFacets[facetName][i];
        const count = solrFacets[facetName][i + 1];
        facets[facetName].push(processFacet(data.facets[facetName], raw, count));
      }
    }
    return facets;
  },

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
