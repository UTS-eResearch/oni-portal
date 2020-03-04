const $ = require("jquery");
const ViewSubDoc = require('./ViewSubDoc');
const SubDocHorizontal = require('./SubDocHorizontal');
const SubDocDate = require('./SubDocDate');
const SubDocIframe = require('./SubDocIframe');
const SubDoc = require('./SubDoc');

const ViewTable = function (doc, fields) {

  const div = $('<div class="table table-responsive">');

  for (let sdcf of fields) {
    const list = $('<div class="table">');
    let subDoc;
    switch (sdcf.display) {
      case 'SubDocHorizontal':
        if(doc[sdcf.field]) {
          subDoc = SubDocHorizontal({key: sdcf.field, value: doc[sdcf.field], fieldName: sdcf.fieldName});
          list.append(subDoc);
        }
        break;
      case 'SubDocDate':
        if(doc[sdcf.field]) {
          subDoc = SubDocDate({key: sdcf.field, value: doc[sdcf.field], fieldName: sdcf.fieldName});
          list.append(subDoc);
        }
        break;
      case 'SubDocIframe':
        // passing the config and the document id to the component so it can build the URL
        if(doc[sdcf.field]) {
          subDoc = SubDocIframe(
            { key: sdcf.field,
              value: doc[sdcf.field],
              fieldName: sdcf.fieldName,
              id: doc['id'],
              cf: sdcf
            });
          list.append(subDoc);
        }
        break;
      case 'SubDoc':
        if(doc[sdcf.field]) {
          subDoc = SubDoc({key: sdcf.field, value: doc[sdcf.field], fieldName: sdcf.fieldName, template: sdcf.template});
          list.append(subDoc);
        }
        break;
      default:
        if(doc[sdcf.field]) {
          const row = $('<div class="row">');
          const defaultKey = $('<div class="col-sm-2">').html(`${sdcf.fieldName}`);
          const defaultValue = $('<div class="col-sm-6">').html(doc[sdcf.field]);
          row.append(defaultKey).append(defaultValue);
          list.append(row);
        }
    }
    div.append(list);
  }
  return div;
};

module.exports = ViewTable;