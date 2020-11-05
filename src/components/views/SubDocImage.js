const $ = require('jquery');

const SubDocImage = function (data) {
  try {
    const dataValue = JSON.parse(data.value);
    let imagePath = '';
  if (data.config.prefix) {
    imagePath = data.config.prefix + dataValue['@id'];
  }
  const valueImage = `<img style="max-height: 300px;" src="${imagePath}" alt="${dataValue['display']}">`
  if (data.config.label) {
    const label = $('<div class="col-sm-2">').html(data.config.label);
    const value = $('<div class="col-sm-6">').html(valueImage);
    data.element.append(label).append(value);
  } else {
    const value = $('<div class="col-sm-8">').html(valueImage);
    data.element.append(value);
  }
  return data.element;
  } catch (e) {
    return data.element.append('error displaying element: ' + e)
  }
};

module.exports = SubDocImage;
