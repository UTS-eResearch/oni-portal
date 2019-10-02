const $ = require("jquery");

const ViewSubDoc = function (ele) {

  try {
    if (Array.isArray(ele)) {
      const dummy = $('<div>');
      const subDocTitle = $('<div>');
      subDocTitle.html('Author/s');
      dummy.append(subDocTitle);
      for (let el of ele) {
        const div = $('<div>');
        const a = $('<a>');
        const sub = JSON.parse(el);
        const href = `/#view/${sub['@id']}`;
        a.attr('href', href);
        a.attr('title', sub['name']);
        a.text(sub['name']);
        a.addClass("link");
        div.append(a);
        dummy.append(div);
      }
      return dummy;

    } else {
      return ele;
    }

  } catch (e) {
    console.error(`Error: ${e.message} for ${ele}`);
    return ele;
  }

};

module.exports = ViewSubDoc;