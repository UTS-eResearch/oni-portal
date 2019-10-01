const $ = require("jquery");

const ViewSubDoc = function (ele) {

  try {
    if (Array.isArray(ele)) {
      ele = ele[0];
      const dummy = $('<div>');
      const sub = $('<div>');
      const a = $('<a>');
      console.log(ele);
      ele = JSON.parse(ele);
      const href = `/#view/${ele['@id']}`;
      a.attr('href', href);
      a.attr('title', ele['name']);
      a.text(ele['name']);
      a.addClass("link");
      sub.append(a);
      console.log(a.html());
      dummy.append(sub);
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