const $ = require('jquery');

const SubDocImage = function (data) {
  try {
    let dataValue;
    let imagePath = '';
    if(data.config.json) {
      dataValue = JSON.parse(data.value);
      if(data.config.element) {
        imagePath = data.config.prefix + dataValue[data.config.element];
      }else {
        imagePath = data.config.prefix + dataValue;
      }
    } else {
      dataValue = data.value;
      if (data.config.prefix) {
        imagePath = data.config.prefix + dataValue;
      } else {
        imagePath = dataValue
      }
    }
  const valueImage = `<img style="max-height: 300px;" src="${imagePath}" alt="${dataValue['display']}">`
  if (data.config.label) {
    const label = $('<div class="col-sm-2">').html(`<strong>${data.config.label}</strong>`);
    const value = $('<div class="col-sm-10">').html(valueImage);
    data.element.append(label).append(value);
  } else {
    const value = $('<div class="col-sm-12">').html(valueImage);
    data.element.append(value);
  }
  return data.element;
  } catch (e) {
    return data.element.append('error displaying element: ' + e)
  }
};

module.exports = SubDocImage;
