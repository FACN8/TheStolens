const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");

const extention = {
  html: { "Content-Type": "text/html" },
  css: { "Content-Type": "text/css" },
  js: { "Content-Type": "application/javascript" },
  png: { "Content-Type": "image/png" },
  jpg: { "Content-Type": "image/jpg" },
  ico: { "Content-Type": "image/x-icon" },
  json: { "Content-Type": "application/json" },
  text: { "Content-Type": "text/plain" }
};

const homePageHandler = (request, response) => {
  const url = path.join(__dirname, "..", "public", "index.html");

  fs.readFile(url, (err, file) => {
    if (err) {
      response.writeHead(500, extention.text);
      response.end(`Error reading file: ${err}`);
      return;
    }
    response.writeHead(200, extention.html);
    response.end(file);
  });
};

const publicHandler = (request, response) => {};

const inputHandler = (request, response) => {};

module.exports = {
  homePageHandler,
  publicHandler,
  inputHandler
};
