const $ = require('jquery');
const _ = require('lodash');

const SubDocJsonArray = function (data) {
  try {
    const div = $('<div class="row-desc-json">');
    const subDiv = $('<div>');
    const title = $('<div>');
    const header = $(data.config.headerHtml || '<h4>');
    header.append(data.config.label);
    title.append(header);
    subDiv.append(title);
    div.append(subDiv);
    const dataValue = JSON.parse(data.value);
    if (Array.isArray(dataValue)) {
      dataValue.forEach((dataEach, index) => {
        const list = $('<div class="row row-desc-json">');
        const keyConfig = data.config.keys;
        Object.keys(dataEach).forEach(function (key) {
          const foundKey = _.find(keyConfig, kc => kc.id === key);
          if (foundKey) {
            let value;
            if(foundKey.displayNumber){
              const label = $('<div class="col-sm-2">').html(`<strong>${index+1}</strong>`);
              list.append(label);
              value = $('<div class="col-sm-10">').html(dataEach[key]);
            } else if (foundKey.displayLabel) {
              const label = $('<div class="col-sm-2">').html(`<strong>${key}</strong>`);
              value = $('<div class="col-sm-10">').html(dataEach[key]);
              list.append(label);
            } else {
              value = $('<div class="col-sm-12">').html(dataEach[key]);
            }
            list.append(value);
          }
        });
        div.append(list);
      });
      return data.element.append(div);
    } else {
      return data.element.append('Error: value is not in array form')
    }
  } catch (e) {
    return data.element.append('error displaying element' + data.config.element)
  }
};

module.exports = SubDocJsonArray;
