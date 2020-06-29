const $ = require("jquery");
const ViewSubDoc = require('./ViewSubDoc');
const SubDocHorizontal = require('./SubDocHorizontal');
const SubDocDate = require('./SubDocDate');
const SubDocIframe = require('./SubDocIframe');
const SubDoc = require('./SubDoc');

const ViewTable = function (data, doc, fields) {

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
              cf: sdcf,
              api: data.apis.ocfl
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
          console.log(`field ${sdcf.field} = ${JSON.stringify(doc[sdcf.field])}`);
          if( sdcf.label ) {
            const label = $('<div class="col-sm-2">').html(sdcf.label);
            const value = $('<div class="col-sm-6">').html(doc[sdcf.field]);
            row.append(label).append(value);
          } else {
            const value = $('<div class="col-sm-8">').html(doc[sdcf.field]);
            row.append(value);
          }
          list.append(row);
        }
    }
    div.append(list);
  }
  return div;
};

module.exports = ViewTable;