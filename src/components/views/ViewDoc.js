const $ = require("jquery");
const ViewTable = require('./ViewTable');
const ViewErrorElement = require('./ViewErrorElement');
const ViewRelated = require('./ViewRelated');
const isIterable = require('../isIterable');

const ViewDoc = function (data) {

  const doc = data.main.doc;
  const dummy = $('<div>');
  const summary = $('<div class="jumbotron">');
  if (doc) {
    const heading = $('<h1>').html(doc.name);
    const desc = $('<p>').html(doc.description);
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
    const linkTo = $('<div>');
    if (isIterable(doc['uri_id'])) {
      for (let resolve of doc['uri_id']) {
        const goTo = $('<a>');
        goTo.attr('href', `${data.config.repo}${resolve}`);
        goTo.attr('title', 'Open Record');
        goTo.attr('target', 'blank');
        goTo.text('Open Record');
        goTo.addClass("link");
        linkTo.append(goTo);
      }
    }
    let tableFields = data.main.viewFields || [];
    // if (doc['record_type_s'] === data.main.tabledDoc) {
    //   tableFields = data.main.viewFields;
    // }

    summary.append(heading)
        .append(desc)
        .append(ViewTable(doc, tableFields))
        .append(related)
        .append(linkTo);
    dummy.append(summary);
    return dummy.html();
  } else {
    summary.append(ViewErrorElement()).html();
    dummy.append(summary);
    return dummy.html();
  }
};

module.exports = ViewDoc;