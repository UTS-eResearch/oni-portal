const $ = require('jquery');

const SubDocImageArray = function (data) {
  if (Array.isArray(data.value)) {
    const dataValue = data.value;
    dataValue.forEach(function (d) {
      if(data.config.json) {
        try {
          const json = JSON.parse(d);
          d = json[data.config.element || '@id'];
        } catch(e) {
          console.error(e);
          throw ('Error: cannot parse json SubDocImageArray');
        }
      }
      let imagePath = '';
      if (data.config.prefix) {
        imagePath = data.config.prefix + d;
      }
      const valueImage = `<img style="max-height: 300px;" src="${imagePath}" alt="${dataValue['display']}">`
      if (data.config.label) {
        const label = $('<div class="col-sm-2">').html(`<strong>${data.fieldName}</strong>`);
        const value = $('<div class="col-sm-10">').html(valueImage);
        data.element.append(label).append(value);
      } else {
        const value = $('<div class="col-sm-12">').html(valueImage);
        data.element.append(value);
      }
    });
    return data.element;
  } else {
    return data.element.append('Error: value is not in array form')
  }
};

module.exports = SubDocImageArray;
