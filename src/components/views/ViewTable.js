const $ = require("jquery");
const ViewSubDoc = require('./ViewSubDoc');
const ViewTable = function (doc, fields) {

  //"fields" =  ["name", "author", "description", "publisher", "date"]
  const dummy = $('<div>');
  const table = $('<table class="table">');

  for (let key of fields) {
    const tr = $('<tr>');
    if (key === 'author') {
      const subDoc = ViewSubDoc(doc[key]);
      tr.append(subDoc);
    } else {
      tr.append($('<th>').html(key));
      tr.append($('<td>').html(doc[key]));
    }
    table.append(tr);
  }
  dummy.append(table);
  return dummy;
};

module.exports = ViewTable;