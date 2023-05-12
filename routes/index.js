var express = require('express');
var router = express.Router();
var server = require("https")
var key = "6c7833916617f4c49a4998db20d3acaf"
var allWeatherData;
var axios=require("axios")
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;
 var lastsearch=["Indore","Bhopal","Delhi","Mumbai"];

var arrofcities=City.getAllCities();

console.log(arrofcities.length);
function cityarr(cityinput){

  let city=arrofcities.filter(function(obj){
    if(obj.name.includes(`${cityinput}`)){
      return obj;
    }
  })
  return city;
}

router.get('/', function (req, res, next) {
  res.render('index', { data: null});
});
router.post("/", (req, res) => {

  //getting users input

  let cityNames = req.body.city;
  lastsearch.unshift(cityNames)
  lastsearch.pop(3)
  console.log(lastsearch)
  //getting open weather endpoint

  const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=${key}&units=metric`;

  //requesting data from openWeather Servers

  server.get(weatherData, response => {

    response.on("data", data => {

      //use try and catch to catch all possible errors

      try {
          allWeatherData = JSON.parse(data);
          console.log(allWeatherData)
        const imageIcon = allWeatherData.weather[0].icon;
        const image = `http://openweathermap.org/img/wn/${imageIcon}@2x.png`;
        res.render("index", { data: allWeatherData, img: image, error: null });
      }
      catch (e) {
        res.send(e);
      }

    })

  })

})


router.get("/getsuggestion/:name",function(req,res){
  let cityname=req.params.name;
  
  var cities=cityarr(cityname);

  res.json({cities});

})

router.get('/lastsearch',function(req,res){
     res.send(lastsearch)
})
 
 
 
 

module.exports = router;
