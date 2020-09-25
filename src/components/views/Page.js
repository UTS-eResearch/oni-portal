const Page = function (content) {
  let html = `
  <div class="container col-sm-12 col-xl-9">
    <h2>${content.title}</h2>
    <div> ${content.text} </div>
  `;
  if (content.comments) {
    html += `<div> ${content.comments} </div>`;
  }
  html += `</div>`;
  return html;
};

module.exports = Page;
