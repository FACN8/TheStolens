const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");

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

const publicHandler = (request, response) => {
    const url = path.join(__dirname, "..", request.url);
    const fileExt = url.split(".")[1];

    fs.readFile(url, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, extension.html);
            response.end("404 File in public directory not found");
            return;
        }
        response.writeHead(200, extension[fileExt]);
        response.end(file);
    });
};

const inputHandler = (request, response) => {};

const homePageHandler = (request, response) => {
  const url = path.join(__dirname, "..", "public", "index.html");

  fs.readFile(url, (err, file) => {
    if (err) {
      response.writeHead(500, extension.text);
      response.end(`Error reading file: ${err}`);
      return;
    }
    response.writeHead(200, extension.html);
    response.end(file);
  });
};

module.exports = {
  homePageHandler,
  publicHandler,
  inputHandler
};
