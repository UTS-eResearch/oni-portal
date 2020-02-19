const $ = require("jquery");
const isIterable = require('../isIterable');

const Facets = function (data) {
  let html = '';
  console.log(`Facets: ${JSON.stringify(data.facetsDisplay)}`);
  console.log(`Facets: ${JSON.stringify(data.facetData)}`);
  if(isIterable(data.facetsDisplay) ){
    html = `<ul class="list-group col-md-2">`;
    for(let fd of data.facetsDisplay){
      html += `<li class="list-group-item">
      <div>
         <h4>${fd.displayText}</h4>
         <hr/>
         <ul class="list-group">`;
         console.log(`fdname = ${fd.name}, all facets = ${JSON.stringify(data.facetData)}`);
         const currentFacet = data.facetData.filter((f)=>{
           return f.name === fd.name;
         });
         console.log(`filtered currentFacet = ${JSON.stringify(currentFacet)}`);
        if(isIterable(currentFacet)){
           for(let facet of currentFacet){            
             html += `<li class="row">
             <div class="col-sm-4">${facet['count']}</div>
             <div class="col-sm-8"><a href="/${facet['route']}${facet['searchUrl']}">${facet['searchText']}</a></div>
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
