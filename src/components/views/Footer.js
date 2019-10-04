const Footer = function (data) {
  return `
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          <div class="copyright">
            <p class="font-weight-light small">&copy; ${data.footer.text}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  `
};

module.exports = Footer;