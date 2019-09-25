const Main = function (data) {
  var html = '';
  const docs = data.main.docs;
  if (docs.length > 0) {
    docs.forEach((d) => {
      var url = '/repo/' + d['uri_id'] + '/';
      html += '<div class="item"><a href="' + url + '">' + d['name'][0] + '</a> ' + d['record_type_s'] + '</div>\n'
    });
  }
  return html;
};

module.exports = Main;