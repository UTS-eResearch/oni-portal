const $ = require('jquery');

// very basic subgraph rendering

const SubDocSubgraph = function (data) {
  try {
    const rows = [];
    const subgraph = JSON.parse(data.value);
    for( let item of subgraph ) {
      const id = item['@id'];
      const name = item['name'];
      const type = Array.isArray(item['@type']) ? item['@type'][0] : item['@type'];
      const row = $('<div class="row">');
      row.append($('<div class="col-sm-2">').html(type));
      row.append($('<div class="col-sm-6">').html(name));
      rows.push(row);
      data.element.append(row);
    }
    return rows;
  } catch (e) {
    return [ data.element.append('error displaying element' + data.config.element) ];
  }

};

module.exports = SubDocSubgraph;
