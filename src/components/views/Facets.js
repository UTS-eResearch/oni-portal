const $ = require("jquery");
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');

// TODO - Refactoring possibility

// Sidebar facets and result facets do things slightly differently.

// On the sidebar, the facet results from the search are processed (ie JSON
// values are crosswalked) as a batch by Facets.processAll and then displayed
// with renderFacet, which feeds the processed facet values to Facet.linkProcessed

// Result facets are done by taking the individual raw (possibly JSON) facet
// values and rendering them with Facet.link, which calls process and then 
// linkProcessed.

// So the two sets of facets use the same code to process and render links,
// but in a slightly different and convoluted way, which could be cleaned up.


function renderFacet(data, facetName, showFocusLink) {
  const facet = data.facets[facetName];
  if ( !(facetName in data.facetData) ) {
    console.log(`can't find facet data for ${facetName}`);
    return `<p>No facet data for ${facetName}`;
  }

  const values = data.facetData[facetName].filter((v)=>v['count'] > 0);

  let focusLink = showFocusLink ? SearchPath.toURI({}, { showFacet: facetName }) : null;
  let html = `<li class="list-group-item">
  <div>
    <div class="facetLabel">${facet.label}</div>
        <ul class="list-group">`;
  if(isIterable(values)) { 
    for(let f of values ){       
      html += `<li class="facet">${Facets.linkProcessed(data, facet, f)} (${f['count']})</span></li>\n`;
    }
  }
 
  if( focusLink ) {
    html += `<li class="facet"><a href="${focusLink}">All...</a></li>`;
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
        display: value['display'],
        search: value['search'],
        field: cf['field'],
        count: count
      }
    } else {
      //console.log(`Facet parse error ${cf['field']} '${raw}'`);
      return {
        display: '---',
        search: '',
        field: '',
        count: count
      }
    }  
  } else {
    return {
      display: raw,
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
    //console.log("Facet parse error: " + e);
    return  null;
  }
}



const Facets = {

  // the first two methods are used to convert raw facet results from Solr (which might
  // be JSON snippets with fields for a person or identifier) into objects with a
  // displayable text value, the search field and value, and optionally a count.

  // processAll: process all of the facet results for a search into the displayable
  // format used for the sidebar facets
  //
  // TODO - stash facet maps at this stage

  processAll: function(data, solrFacets) {
    const facets = {};
    const filterMaps = {};
    for( let facetName in solrFacets ) {
      facets[facetName] = [];
      const filterMap = {};
      for( let i = 0; i < solrFacets[facetName].length; i += 2 ) {
        const raw = solrFacets[facetName][i];
        const count = solrFacets[facetName][i + 1];
        const facetVal = processFacet(data.facets[facetName], raw, count);
        facets[facetName].push(facetVal);
        filterMap[facetVal['search']] = facetVal['display'];
      }
      filterMaps[data.facets[facetName].field] = filterMap;
    }
    return { facets: facets, filterMaps: filterMaps }
  },

  // process: process a single value. This is used for the facet links on search results

  process: function (data, facetName, raw) {
    return processFacet(data.facets[facetName], raw);
  },

  // sidebar: render and return all of the sidebar facets. If data.main.showFacet is
  // set, we're viewing showFacet in the main column, so it will be skipped here

  sidebar: function (data) {
    let html = '';

    if(isIterable(data.results.searchFacets) ){
      html = `<ul class="list-group col-sm-4">`;
      for(let facetName of data.results.searchFacets ) {
        if( ! data.main.showFacet || facetName !== data.main.showFacet ) {
          html += renderFacet(data, facetName, true);
        }
      }
      html += `</ul>`;
    }
  return html;
  },

  // focus: for when we're viewing all of the results from a single facet in the
  // main column

  focus: function(data, showFacet) {
    if( showFacet in data.facets ) {
      let html = `<ul class="list-group col-9">`;
      html += renderFacet(data, showFacet, false);
      html += `</ul>`;
      return html;
    } else {
      return `<p>Facet ${showFacet} not found</p>`;
    }
  },

  // link: generates a facet link from the results returned from the process methods
  // above

  linkProcessed: function(data, facet, f) {
    const url = SearchPath.toURI(data.main.currentSearch, { [facet['field']]: f['search'] } );

    if( facet['display_re'] ) {
      const m = f['display'].match(facet['display_re']);
      if( m ) {
        return `<a href="${url}" title="${m[2]}">${m[1]}</a>`;
      } else {
        console.log("no match!");
      }
    }
    return `<a href="${url}">${f['display']}</a>`;
  },

  // link: nicer process/link

  link: function(data, facetName, raw) {
    const processed = processFacet(data.facets[facetName], raw);
    return Facets.linkProcessed(data, data.facets[facetName], processed);
  },

  // filterTag: takes a search field and resolve the value back to the displayable value
  // which was stored in data.filterMaps. This is used to make sure that facets which are
  // searched by ID (like FORs) get displayed in the filter tags in a human-readable way

  filterTag: function(data, field) {
    if( field in data.main.currentSearch ) {
      if( field in data.filterMaps ) {
        return data.filterMaps[field][data.main.currentSearch[field]];
      } else {
        return data.main.currentSearch[field];
      }
    } else {
      return '';
    }
  }  


};

module.exports = Facets;
