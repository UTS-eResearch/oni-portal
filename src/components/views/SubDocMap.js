const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDocMap = function (data) {
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(data.fieldName);
  div.append(headerDiv);
  const mapDiv = $('<div class="col-sm-8" id="leaflet">');
  div.append(mapDiv);

  // now the Leaflet stuff needs to run after the page has been rendered

  // to-do - this should deal with multiple values

  data.state.callbacks.push(() => {
    const map = L.map('leaflet');
    const defaultCenter = [data.value[0], data.value[1]];
    const defaultZoom = 3;
    const basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    const marker = L.marker(defaultCenter);

    map.setView(defaultCenter, defaultZoom);

    basemap.addTo(map);
    marker.addTo(map);
  });

  return div;
}

module.exports = SubDocMap;