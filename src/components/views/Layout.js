const Header = require('./Header');
const Menu = require('./Menu');
const Search = require('./Search');
const Footer = require('./Footer');


const Layout = function (data, sidebar, main) {

  return `<div class="content-inside">
  ${Header(data)}
  ${Menu(data)}
  ${Search(data)}

  <div><br/></div>
  <div class="container col-sm-12 col-xl-9">
  <div class="row">

  ${sidebar}

  ${main}


  </div>
  </div>

  ${Footer(data)}
  </div>`;
};

module.exports = Layout;