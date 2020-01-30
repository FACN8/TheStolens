const handler = require("./handler.js");

const router = (request, response) => {

  if (request.url === '/') {
    request.url = '/public/index.html';
  }

  if (request.url.includes("/public/")) {
    handler.publicHandler(request, response);
  } else if (request.url.includes("/search?")) {
    handler.inputHandler(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 content not found");
  }
};

module.exports = router;