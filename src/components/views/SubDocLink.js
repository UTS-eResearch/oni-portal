const $ = require('jquery');

const SubDocLink = function (data) {
  try {
    let dataValue = data.value;
    if(data.config.json) {
      const json = JSON.parse(data.value);
      dataValue = json[data.config.element || '@id'];
    }
    let text = dataValue;
    if (data.config.text) {
      text = data.config.text;
    }
    let value = dataValue;
    if (data.config.prefix) {
      value = `${data.config.prefix}${dataValue}`;
    }
    const valueLink = `<a href="${value}" rel="noreferer noopener" target="_blank">${text}</a>`;
    if (data.config.label) {
      const label = $('<div class="col-sm-2">').html(data.config.label);
      const value = $('<div class="col-sm-6">').html(valueLink);
      data.element.append(label).append(value);
    } else {
      const value = $('<div class="col-sm-8">').html(valueLink);
      data.element.append(value);
    }
    return data.element;
  } catch (e) {
    return data.element.append('error displaying element' + data.config.element)
  }
};

module.exports = SubDocLink;
