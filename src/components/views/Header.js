const Header = function (data) {
  return `
    <header id="header" class="container">


<nav class="navbar navbar-light bg-transparent">
  <a class="navbar-brand" href="${data.header.URL}">
    <img src="${data.header.logo}" width="110" height="51" class="d-inline-block align-top" alt="${data.header.title}">
    <span style="font-size: 188%">${data.header.title}</span>
  </a>
</nav>


    </header>
    `
};

module.exports = Header;
