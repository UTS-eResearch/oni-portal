const Facets = require('./Facets');

const ListDocs = function (data) {
  var html = '';
  const docs = data.main.docs;
  html += `<div class="container col-sm-12 col-xl-9"><div class="row">`
  html += Facets(data);
  html += `<ul class="list-group col-sm-8">`;
  if (docs.length > 0) {
    docs.forEach((d) => {
      var url = `${data.config.repo}${d['uri_id']}/`;
      var url = `/#view/${d['id']}`;
      html += `<li class="list-group-item">
        <div class="item"><a href="${url}">${d['name'][0]}</a> ${d['record_type_s']} </div>
      </li>`;
    });
  } else {
    html += `<div class="text-center"> No data found</div>`;
  }
  html += `</ul><div><br/></div>`;
  html += `</div></div>`;
  return html;
};

module.exports = ListDocs;
