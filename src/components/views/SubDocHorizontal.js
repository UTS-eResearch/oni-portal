const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDocHorizontal = function (data) {
  const div = $('<div class="row">');
  let subDiv = $('<div>');

  if (data.fieldName) {
    const headerDiv = $('<div class="col-sm-2">').html(data.fieldName);
    div.append(headerDiv);
    subDiv.addClass('col-sm-10');
  }

  if (isIterable(data.value)) {
    let i = 0;
    for (let key of data.value) {
      i++;
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
        subDiv.append(subEle);
        if (data.value.length > i) {
          subDiv.append($('<span>,&nbsp;</span>'));
        }
      } catch (e) {
        subDiv.append('');
      }
    }
  }
  div.append(subDiv);

  return div;
}

module.exports = SubDocHorizontal;