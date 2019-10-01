const $ = require("jquery");
const ViewTable = require('./ViewTable');
const ViewErrorElement = require('./ViewErrorElement');

const ViewDoc = function (data) {

  const doc = data.main.doc;
  const dummy = $('<div>');
  const summary = $('<div class="jumbotron">');
  if (doc) {
    const heading = $('<h1>').html(doc.name);
    const desc = $('<p>').html(doc.description);
    const date = $('<p>').html(doc.datePublished);

    const fields = ["author"];

    summary.append(heading).append(desc).append(date).append(ViewTable(doc, fields));
    dummy.append(summary);
    return dummy.html();
  } else {
    summary.append(ViewErrorElement()).html();
    dummy.append(summary);
    return dummy.html();
  }
};

module.exports = ViewDoc;