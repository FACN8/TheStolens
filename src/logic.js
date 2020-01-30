const extension = {
  html: { "Content-Type": "text/html" },
  css: { "Content-Type": "text/css" },
  js: { "Content-Type": "application/javascript" },
  png: { "Content-Type": "image/png" },
  jpg: { "Content-Type": "image/jpg" },
  ico: { "Content-Type": "image/x-icon" },
  json: { "Content-Type": "application/json" },
  text: { "Content-Type": "text/plain" }
};

const createRouteElement = data => {
  let elements = [];

  Object.keys(data).forEach(key => {
    let item = "<li>";
    Object.keys(data[key]).forEach(key1 => {
      let span = "<br><span>";
      span +=
        key1.substring(0, 1).toUpperCase() +
        key1.replace("_", " ").slice(1) +
        ": " +
        data[key][key1];
      span += "</span>";
      item += span;
      item += "<br>";
    });
    item += "</li>";
    item = item.replace("<br>", "");
    elements.push(item);
  });
  return elements;
};

module.exports = {
  extension,
  createRouteElement
};
