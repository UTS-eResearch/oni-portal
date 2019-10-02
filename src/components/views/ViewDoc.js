const $ = require("jquery");
const ViewTable = require('./ViewTable');
const ViewErrorElement = require('./ViewErrorElement');
const ViewRelated = require('./ViewRelated');

const ViewDoc = function (data) {

  const doc = data.main.doc;
  const dummy = $('<div>');
  const summary = $('<div class="jumbotron">');
  if (doc) {
    const heading = $('<h1>').html(doc.name);
    const desc = $('<p>').html(doc.description);
    const date = $('<p>').html(doc.datePublished);
    const related = $('<div>');
    if (data.main.related.length > 0) {
      const relatedInfo = $('<h3>').html('Related Objects');
      related.append(relatedInfo);
      const relatedUl = $('<ul>');
      for (let rel of data.main.related) {
        const relatedLi = $('<li>');
        relatedLi.append(ViewRelated(rel));
        relatedUl.append(relatedLi);
      }
      related.append(relatedUl);
    }
    const fields = ["author"];

    summary.append(heading).append(desc).append(date).append(ViewTable(doc, fields)).append(related);
    dummy.append(summary);
    return dummy.html();
  } else {
    summary.append(ViewErrorElement()).html();
    dummy.append(summary);
    return dummy.html();
  }
};

module.exports = ViewDoc;