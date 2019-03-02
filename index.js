// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

// CONVERTOR CODE
app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amountToConvert = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amountToConvert
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var conversionTime = data.time;
    var convertedAmount = data.price;
    res.write("<p>At the time: " + conversionTime + "</p>");
    res.write("<p>" + amountToConvert + " " + crypto + " is worth " + convertedAmount + " " + fiat + "</p>");
    res.send();
  });
});



app.listen(3000, function() {
  console.log("server running on port 3000");
});
