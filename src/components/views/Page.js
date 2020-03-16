const Page = function (content) {
  return `
  <div class="container col-sm-12 col-xl-9">
    <h2>${content.title}</h2>
    <div> ${content.text} </div>
  </div>
  `
};

module.exports = Page;