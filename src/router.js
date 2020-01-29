const handler = require("./handler.js");

const router = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handler.homePageHandler(request, response);
  } else if (url.includes("/public/")) {
    handler.publicHandler(request, response);
  } else if (url.includes("/search?")) {
    handler.inputHandler(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 content not found");
  }
};

module.exports = router;