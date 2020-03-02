const $ = require("jquery");
const isIterable = require('../isIterable');
const SearchPath = require('../SearchPath');

function facetLink(data, facet, f) {
  const url = SearchPath.toURI(data.main.currentSearch, { [facet['field']]: f['search'] } );

  // const url = `/#search/0/1/${facet['field']}=${encodeURIComponent('"' + f['search'] + '"')}`;
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

const Facets = function (data) {
  let html = '';
  if(isIterable(data.facets) ){
    html = `<ul class="list-group col-3">`;
    for(let facet of data.facets) {
      const values = data.facetData[facet.name].filter((v)=>v['count'] > 0);
      html += `<li class="list-group-item">
      <div>
         <h4>${facet.label}</h4>
         <hr/>
         <ul class="list-group">`;

       if(isIterable(values)) { 
        for(let f of values ){       
          html += `<li class="row">${facetLink(data, facet, f)} (${f['count']})</li>\n`;
          }
      }
      html += `</ul>
      </div>
      </li>`
    }
    html += `</ul>`;
  };

  return html;
};

module.exports = Facets;
