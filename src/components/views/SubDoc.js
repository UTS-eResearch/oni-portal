const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDoc = function (data) {
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(data.fieldName);
  div.append(headerDiv);
  if (isIterable(data.value)) {
    for (let key of data.value) {
      try {
        const subDiv = $('<div class="col-sm">');
        const item = JSON.parse(data.value);
        // TODO: talk to Michael Lynch
        const display = eval("`"  + data.template + "`");
        const dis = $('<span>').html(display);
        subDiv.append(dis);
        div.append(subDiv);
      } catch (e) {
        div.append('')
      }
    }
  }
  return div;
}

module.exports = SubDoc;