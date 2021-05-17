const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDocIframe = function (data) {
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(`<strong>${data.fieldName}</strong>`);
  div.append(headerDiv);

  try {
    const value = JSON.parse(data.value);
    const url = data.api + '/' + data.id + '/' + value['@id'];
    const width  = data.cf.width || '800';
    const height = data.cf.height || '800';

    const iframe = $('<iframe>', { width: width, height: height, src: url });
    div.append(iframe);

    return div;
  } catch(e) {
    div.append($('<span>').html(`Error building iframe ${e}`));
    return div;
  }
}

module.exports = SubDocIframe;
