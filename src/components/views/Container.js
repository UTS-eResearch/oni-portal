const Container = function (data) {
  const html = `<div class="content-inside">`;
  const endhtml = `</div>`;
  return [html, ...data, endhtml].join('');
};

module.exports = Container;