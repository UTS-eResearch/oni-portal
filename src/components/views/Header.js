const Header = function (data) {
  return `
    <header id="header" class="container">
    <div class="container-fluid">
          <div class="row">
            <div class="col-md-9">
              <p></p>
              <p class="header-main">
                <img src="${data.header.logo}" [attr.alt]="${data.header.title}" style="width:110px;"/>
                <a href="${data.header.URL}">${data.header.title}</a>
              </p>
            </div>
            <div class="col-md-3">
              <p></p>
              <nav class="navbar">
                <div class="navbar-nav">
                  <a class="nav-item nav-link"
                     href="${data.header.helpURL}" target="_blank noreferer">
                    ${data.header.help}<i class="fa fa-question-circle" aria-hidden="true"></i></a>
                </div>
              </nav>
            </div>
          </div>
        </div>
    </header>
    `
};

module.exports = Header;