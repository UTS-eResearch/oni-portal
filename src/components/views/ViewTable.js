const $ = require("jquery");
const ViewSubDoc = require('./ViewSubDoc');
const SubDocHorizontal = require('./SubDocHorizontal');
const SubDocDate = require('./SubDocDate');
const SubDoc = require('./SubDoc');

const ViewTable = function (doc, fields) {

  const dummy = $('<div>');
  const div = $('<div class="table table-responsive">');

  for (let key of fields) {
    const list = $('<div class="table">');
    let subDoc;
    switch (key.display) {
      case 'SubDocHorizontal':
        if(doc[key.field]) {
          subDoc = SubDocHorizontal({key: key.field, value: doc[key.field], fieldName: key.fieldName});
          list.append(subDoc);
        }
        break;
      case 'SubDocDate':
        if(doc[key.field]) {
          subDoc = SubDocDate({key: key.field, value: doc[key.field], fieldName: key.fieldName});
          list.append(subDoc);
        }
        break;
      case 'SubDoc':
        if(doc[key.field]) {
          subDoc = SubDoc({key: key.field, value: doc[key.field], fieldName: key.fieldName, template: key.template});
          list.append(subDoc);
        }
        break;
      default:
        if(doc[key.field]) {
          const row = $('<div class="row">');
          const defaultKey = $('<div class="col-sm-2">').html(`${key.fieldName}`);
          const defaultValue = $('<div class="col-sm-6">').html(doc[key.field]);
          row.append(defaultKey).append(defaultValue);
          list.append(row);
        }
    }
    div.append(list);
  }
  dummy.append(div);
  return dummy;
};

module.exports = ViewTable;