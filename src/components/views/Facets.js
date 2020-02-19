const $ = require("jquery");
const isIterable = require('../isIterable');

const Facets = function (data) {
  let html = '';
  if(isIterable(data.facets) ){
    html = `<ul class="list-group col-md-2">`;
    for(let facet of data.facets) {
      const values = data.facetData[facet.name].filter((v)=>v['count'] > 0);

      html += `<li class="list-group-item">
      <div>
         <h4>${facet.label}</h4>
         <hr/>
         <ul class="list-group">`;

       if(isIterable(values))
        { 
        for(let f of values ){            
          html += `<li class="row">
             <div class="col-sm-4">${f['count']}</div>
             <div class="col-sm-8"><a href="/#search/${facet['field']}=${encodeURIComponent('"' + f['search'] + '"')}">${f['value']}</a></div>
             </li>`;
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
