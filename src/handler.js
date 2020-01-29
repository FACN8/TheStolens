const fs = require("fs");
const path = require("path");
const urlMod = require("url");
const querystring = require("querystring");
const axios = require('axios');

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

const inputHandler = (request, response) => {
    const apiKey = process.env.API_KEY;
    const queries = querystring.parse(urlMod.parse(request.url).query);

    axios({
            "method": "GET",
            "url": process.env.API,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.API_KEY,
                "x-access-token": process.env.ACCESS_TOKEN
            },
            "params": {
                "origin": queries.from,
                "currency": queries.currency
            }
        })
        .then((res) => {
            let data = res.data.data;
            let elements = [];

            Object.keys(data).forEach((key)=>{
                let item = '<li>';
                Object.keys(data[key]).forEach((key1)=>{
                    let span = '<span>';
                    span += (data[key])[key1];
                    span += '</span>';
                    item += span;
                    item += '<br>';
                });
                item += '</li>';
                elements.push(item);
            })

            response.writeHead(200, extension.html);
            response.end(JSON.stringify(elements));
        })
        .catch((error) => {
            console.log(error);
            response.writeHead(503, extension.html);
            response.end('service Currently Unavailable: Error 503');
        });
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