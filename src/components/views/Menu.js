const Menu = function (data) {
  return `
<nav class="navbar navbar-expand-lg navbar-dark bg-black">
  <a class="navbar-brand" style="visibility: hidden" href="">Data Portal</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      ${pageLinks(data)}   
    </ul>
  </div>
</nav>
  `
};

function pageLinks(data) {
  var html = '';
  if( data.header['menu'] ) {
    data.header['menu'].forEach((m) => {
      const page = data.pages[m];
      if( page ) {
        html += `<li class="nav-item active">
      <a class="nav-link" href="/#page/${m}">${page.title}</a>
      </li>`
      }
    })
  }
  return html;
}

module.exports = Menu;