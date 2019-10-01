const ListDocs = function (data) {
  var html = '';
  const docs = data.main.docs;
  html += `<ul class="list-group">`;
  if (docs.length > 0) {
    docs.forEach((d) => {
      var url = `${data.config.repo}${d['uri_id']}/`;
      var url = `/#view/${d['id']}`;
      html += `<li class="list-group-item">
        <div class="item"><a href="${url}">${d['name'][0]}</a> ${d['record_type_s']} </div>
      </li>`;
    });
  }
  html += `</ul>`;
  return html;
};

module.exports = ListDocs;