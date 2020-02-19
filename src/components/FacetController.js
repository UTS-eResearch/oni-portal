

function tryJSON(value) {
  try {
    return JSON.parse(value);
  } catch(e) {
    console.error(e);
    return null;
  }
}


const FacetController = {

  // transforms the solr facets
  //
  // facetname1: [ f1, count1, f2, count2, f3, count3 ]
  //
  // into a data structure that the view can use:
  //
  // facentname1: [ {
  //     value: f1
  //     count: count1,
  //     search: [value to search on for this facet],
  //     field: [field to search on for this facet]
  // } , .. ]
  //
  // it tries to parse the JSON and pull out the right values
  // to display and search if so configured

  process: function({data: data, config: config}) {
    const facets = {};
    for( let name in data ) {
      facets[name] = [];
      const cfa = config.filter((c) => c.name === name);
      if( cfa.length !== 1 ) {
        console.error("No config found for facet " + name);
      } else {
        const cf = cfa[0];
        const parseJson = cf['JSON'];
        for( let i = 0; i < data[name].length; i += 2 ) {
          if( parseJson ) {
            const value = tryJSON(data[name][i]);
            facets[name].push({
              value: value[cf['display']],
              count: data[name][i + 1],
              search: value[cf['search']],
              field: cf['field']
            })
          } else {
            facets[name].push({
              value: data[name][i],
              count: data[name][i + 1],
              search: data[name][i],
              field: cf['field']
            });
          }
        }
      }
    }
    return facets;
  }
}
module.exports = FacetController;
