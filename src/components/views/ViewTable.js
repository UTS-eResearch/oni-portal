const $ = require("jquery");

const ViewSubDoc = require('./ViewSubDoc');
const SubDocHorizontal = require('./SubDocHorizontal');
const SubDocDate = require('./SubDocDate');
const SubDocIframe = require('./SubDocIframe');
const SubDoc = require('./SubDoc');
const SubDocLink = require('./SubDocLink');
const SubDocJson = require('./SubDocJson');
const SubDocImage = require('./SubDocImage');
const SubDocImageArray = require('./SubDocImageArray');

const ViewTable = function (data, doc) {

  const type = data.main.doc['record_type_s'];
  const fields = data.results.view[type].viewFields;

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
              api: data.apis.ocfl,
              external: sdcf['external']
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
      case 'SubDocLink':
        if(doc[sdcf.field]) {
          const row = $('<div class="row">');
          const valueHtml = renderValue(data, sdcf, doc);
          subDoc = SubDocLink({config: sdcf, value: valueHtml, element: row});
          list.append(subDoc);
        }
        break;
      case 'SubDocJson':
        if(doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          const row = $('<div class="row">');
          subDoc = SubDocJson({config: sdcf, value: valueHtml, element: row});
          list.append(subDoc);
        }
        break;
      case 'SubDocImage':
        if(doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          const row = $('<div class="row">');
          subDoc = SubDocImage({config: sdcf, value: valueHtml, element: row});
          list.append(subDoc);
        }
        break;
      case 'SubDocImageArray':
        if(doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          const row = $('<div class="row">');
          subDoc = SubDocImageArray({config: sdcf, value: valueHtml, element: row});
          list.append(subDoc);
        }
        break;
      default:
        if(doc[sdcf.field]) {
          const row = $('<div class="row">');
          const valueHtml = renderValue(data, sdcf, doc);
          if( sdcf.label ) {
            const label = $('<div class="col-sm-2">').html(sdcf.label);
            const value = $('<div class="col-sm-6">').html(valueHtml);
            row.append(label).append(value);
          } else {
            const value = $('<div class="col-sm-8">').html(valueHtml);
            row.append(value);
          }
          list.append(row);
        }
    }
    div.append(list);
  }
  return div;
};

// FIXME - should use same code as Facets

function renderValue(data, sdcf, doc) {
  if( sdcf.JSON ) {
      try {
        const json = JSON.parse('[' + doc[sdcf.field] + ']');
        if( Array.isArray(json) ) {
          return json.map((i) => i['display']).join(", ");
        } else {
          return json['display']
        }
      } catch(e) {
        console.log(`JSON value parse error on ${sdcf.field} "${doc[sdcf.field]}": ${e}`);
        return '';
      }
  } else {
    return doc[sdcf.field];
  }
}



module.exports = ViewTable;
