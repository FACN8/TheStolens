require("dotenv").config();

const http = require("http");
const port = process.env.PORT || 9000;
const router = require("../src/router.js");
const server = http.createServer(router);

server.listen(port, () => {
  console.log("Now listening on port " + port);
});

module.exports = server;