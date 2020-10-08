const $ = require('jquery');

const SubDocLink = function (data) {
  let text = data.value
  if (data.config.text) {
    text = data.config.text;
  }
  const valueLink = `<a href="${data.value}" rel="noreferer noopener" target="_blank">${text}</a>`;
  if (data.config.label) {
    const label = $('<div class="col-sm-2">').html(data.config.label);
    const value = $('<div class="col-sm-6">').html(valueLink);
    data.element.append(label).append(value);
  } else {
    const value = $('<div class="col-sm-8">').html(valueLink);
    data.element.append(value);
  }
  return data.element;
};
module.exports = SubDocLink;
