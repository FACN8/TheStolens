const fs = require("fs");
const path = require("path");
const urlMod = require("url");
const querystring = require("querystring");
const axios = require("axios");
const logic = require("./logic.js");

const inputHandler = (request, response) => {
  const apiKey = process.env.API_KEY;
  const queries = querystring.parse(urlMod.parse(request.url).query);

  axios({
    method: "GET",
    url: process.env.API,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      "x-access-token": process.env.ACCESS_TOKEN
    },
    params: {
      origin: queries.from,
      currency: queries.currency
    }
  })
    .then(res => {
      let data = res.data.data;
      response.writeHead(200, logic.extension.html);
      response.end(JSON.stringify(logic.createRouteElement(data)));
    })
    .catch(error => {
      console.log(error);
      response.writeHead(503, logic.extension.html);
      response.end("service Currently Unavailable: Error 503");
    });
};

const publicHandler = (request, response) => {
  const url = path.join(__dirname, "..", request.url);
  const fileExt = url.split(".")[1];

  fs.readFile(url, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, logic.extension.html);
      response.end("404 File in public directory not found");
      return;
    }
    response.writeHead(200, logic.extension[fileExt]);
    response.end(file);
  });
};

module.exports = {
  publicHandler,
  inputHandler
};
