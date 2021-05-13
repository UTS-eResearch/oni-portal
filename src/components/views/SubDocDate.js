const $ = require('jquery');
const moment = require('moment');
const isIterable = require('../isIterable');

const SubDocDate = function (data) {
  const div = $('<div class="row">');
  const headerDiv = $('<div class="col-sm-2">').html(`<strong>${data.fieldName}</strong>`);
  div.append(headerDiv);
  if (isIterable(data['value'])) {
    for (let key of data['value']) {
      const value = moment(key).format('LL');
      const eleDiv = $('<div class="col-sm-10">').html(value);
      div.append(eleDiv);
    }
  }

  return div;
};
module.exports = SubDocDate;
