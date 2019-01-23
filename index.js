// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat;
  request(url, function(error, response, body){
  var data = JSON.parse(body);
  var price = data.last;
  var date = data.display_timestamp;
  res.write("<p>Current date: " + date + "</p>");
  res.write("<h2>The price of 1 " + crypto + " is " + price + " " + fiat + "</h2>");
  res.send();
  });
});



app.listen(3000, function() {
  console.log("server running on port 3000");
});
