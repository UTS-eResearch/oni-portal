const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDocHorizontal = function (data) {
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(data.fieldName);
  div.append(headerDiv);

  if (isIterable(data.value)) {
    for (let key of data.value) {
      try {
        const a = $('<a>');
        const subEle = $('<span class="">');
        const sub = JSON.parse(key);
        const href = `/#view/${sub['@id']}`;
        a.attr('href', href);
        a.attr('title', sub['name']);
        a.text(sub['name']);
        a.addClass("link");
        subEle.append(a);
        div.append(subEle);

      } catch (e) {
        div.append('');
      }
    }
  }


  return div;
}

module.exports = SubDocHorizontal;