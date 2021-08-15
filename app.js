//jshint esversion:7

const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000, function(){console.log("server running");});


app.get("/",function(req, res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){


  const city = req.body.cityName;
  const appKey = "63062fbd6a28a2da4d481724cb7971d6";
  const unit = req.body.units;
  const url = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=" +appKey+ "&q=" +city+ "&units=metric" +unit;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.setHeader("Content-Type", "text/html");
      res.write("<h3>The Weather is currently : " + des + "</h3>");
      res.write("<h1>The temperature in " +city+ " is :" + temp + " Degree Celcius</h1>");
      res.write("<img src="+imageURL+">");
      res.send();

    });
  });
});
