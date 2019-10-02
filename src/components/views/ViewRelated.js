const $ = require("jquery");

const ViewRelated = function (data) {
  return $(`<a href="#view/${data.id}">${data.name}</a>`);
}

module.exports = ViewRelated;