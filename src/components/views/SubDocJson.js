const $ = require('jquery');

const SubDocJson = function (data) {
  try {
    const value = JSON.parse(data.value);
    let text = data.value
    if (data.config.element) {
      text = value[data.config.element];
    }
    if (data.config.label) {
      const label = $('<div class="col-sm-2">').html(data.config.label);
      const value = $('<div class="col-sm-6">').html(text);
      data.element.append(label).append(value);
    } else {
      const value = $('<div class="col-sm-8">').html(text);
      data.element.append(value);
    }
    return data.element;
  } catch (e) {
    return data.element.append('error displaying element' + data.config.element)
  }

};

module.exports = SubDocJson;
