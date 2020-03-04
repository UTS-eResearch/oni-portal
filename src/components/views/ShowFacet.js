const $ = require("jquery");

const Facets = require('./Facets');

// View for when we're focusing on all values of a facet

// TODO: pagination?

const ShowFacet = function (data, showFacet) {
  return `
  <div><br/></div>
  <div class="container col-sm-12 col-xl-9"><div class="row">
    ${Facets.sidebar(data)}

    ${Facets.focus(data, showFacet)}
  </div>
  </div>
  `;
};


module.exports = ShowFacet;
