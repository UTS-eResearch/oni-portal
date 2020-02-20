const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDocIframe = function (data) {
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(data.fieldName);
  div.append(headerDiv);

  try {
    const value = JSON.parse(data.value)
    const url = data.cf.baseUrl + '/' + data.id + '/' + value['@id'];
    const width  = data.cf.width || '800';
    const height = data.cf.height || '800';

    div.append($('<iframe>', { width: width, height: height, src: url }));

    console.log(`Iframe : ${JSON.stringify(data)}`);
    return div;
  } catch(e) {
    div.append($('<span>').html(`Error building iframe ${e}`));
    return div;
  }
}

module.exports = SubDocIframe;