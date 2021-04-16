const $ = require("jquery");
const isIterable = require('../isIterable');

const MAP_VIEWER_ID = 'map_viewer';
const TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community';

function centroid(points) {
  if( points.length < 1 ) {
    return [0, 0];
  }
  let x = 0;
  let y = 0;
  for( let p of points ) {
    x += p[0];
    y += p[1];
  }
  return [ x / points.length, y / points.length ];
}


function parseLocation(result) {
  try {
    const json = JSON.parse(result);
    return json['search']
  } catch(e) {
    console.error(`JSON value parse error on ${sdcf.field} "${doc[sdcf.field]}": ${e}`);
    return ''
  }
}



const Geo = {

  // return an element with the right id for the map to be rendered to

  mapHolder: function () {
      return `<div class="col-sm-8" id="${MAP_VIEWER_ID}">`;
  },


  // gets one or more locations from the search results and turns them
  // into a list of values which can be passed to renderMap

  getLocations: function (cf, docs) {
    const locations = [];

    for( let d of docs ) {
      const mapcf = cf['map'][d['record_type_s']];
      if( mapcf ) {
        const loc = parseLocation(d[mapcf['location']]);
        if( loc ) {
          locations.push({
            label: d[mapcf['label']],
            location: loc
          });
        }
      }
    }
    return locations;
  },


  // pass it a list of locations which are
  // [ { label: "Label for point", location: [ lat, lon ] } ]

  renderMap: function (locations) {
    const map = L.map(MAP_VIEWER_ID);
    const defaultCenter = centroid(locations.map((m) => m.location));
    const defaultZoom = 3;
    const basemap = L.tileLayer(TILES, { attribution: ATTRIBUTION });

    map.setView(defaultCenter, defaultZoom);

    basemap.addTo(map);

    for( let l of locations ) {
      const marker = L.marker(l.location).bindPopup(l.label).addTo(map);
    }
  }

}

module.exports = Geo;