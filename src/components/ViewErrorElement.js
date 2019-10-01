const $ = require("jquery");

const ViewErrorElement = function () {

  const dummy = $('<div>');

  const heading = $('<h3>').html('Error');
  const desc = $('<p>').html('Canot display element');

  dummy.append(heading).append(desc);
  return dummy.html();
};

module.exports = ViewErrorElement;