const $ = require("jquery");
const ViewErrorElement = require('./ViewErrorElement');

const ViewDoc = function () {

  const dummy = $('<div>');
  const summary = $('<div class="jumbotron">');
  summary.append(ViewErrorElement());
  dummy.append(summary);
  return dummy.html();
};

module.exports = ViewDoc;