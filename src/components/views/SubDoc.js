const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDoc = function (data) {
  console.log(`SubDoc ${JSON.stringify(data)}`);
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(data.fieldName);
  div.append(headerDiv);
  if (isIterable(data.value)) {
    for (let key of data.value) {
      try {
        const subDiv = $('<div class="col-sm">');
        const dis = $('<span>').html(data.value);
        subDiv.append(dis);
        div.append(subDiv);
      } catch (e) {
        console.log("Error rendering field " + e);
      }
    }
  }
  return div;
}

module.exports = SubDoc;