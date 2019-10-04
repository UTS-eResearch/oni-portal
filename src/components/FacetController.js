const FacetController = {
  get: function({data:arr, toJSON:toJSON}) {
    const facets = [];
    arr.map(function(value, index, Arr) {
      if(index % 2 == 0) {
        if(toJSON){
          try{
            value = JSON.parse(value)
          }catch(e){console.error(e.message);}}
          const facet = {
            value: value, count: arr[index + 1]
          }
          facets.push(facet);
        }
      });
      return facets;
    },
    display: function ({data: data, config: config}) {
      const displays = [];
      data.forEach(function(d){
        const displayFacet = {
          count:d.count,
          name: config.name,
          route: config.route,
          searchUrl: d.value[config.searchUrl],
          searchText: d.value[config.searchText]
        }
        displays.push(displayFacet)
      });
      return displays;
    }
  }

  module.exports = FacetController;
