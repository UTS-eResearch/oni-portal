const Facets = require('./Facets');

// TODO - there should be a single function which generates a
// URI from a facet for the links from each result's facets

const ListDocs = function (data) {
  var html = '';
  const docs = data.main.docs;
  const resultFacets = data.main.resultFacets;
  html += `<div class="container col-sm-12 col-xl-9"><div class="row">`
  html += Facets(data);
  html += `<ul class="list-group col-sm-8">`;
  if (docs.length > 0) {
    docs.forEach((d) => {
      html += `<li class="list-group-item">${listDoc(resultFacets, d)}
        </li>`;
    });
  } else {
    html += `<div class="text-center"> No data found</div>`;
  }
  html += `</ul><div><br/></div>`;
  html += `</div></div>`;
  return html;
};



function listDoc (facets, d) {
  const url = `/#view/${d['id']}`;
  const name = d['name'] ? d['name'][0] : '---';
  const facetValues = facets.map((f) => d[f]).join(' | ');
  const description = d['description'].substr(0, 160) + '...';
  return `<div class="item">
        <div class="item-link"><a href="${url}">${name}</a></div>
        <div class="item-description">${description}</div>
        <div class="item-facets">${facetValues}</div>
        </div>`;
  return html;
};




module.exports = ListDocs;
