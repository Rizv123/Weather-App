const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
    
app.post("/",function(req, res){
    const query = req.body.cityName
    const apikey = "f91db76b4b417fe459a116a65dc46de1";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit;
    https.get(url, function(response){
    console.log(response);
    console.log(response.statusCode); 
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imgURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The Weather is currently " + weatherDescription + "</p>");
        res.write("<h1>the temperature in "+ query +" is " + temp+ " degree celcius</h1>");
        res.write("<img src="+ imgURL +">");
       
        res.send();
            });
        });
});

     

app.listen(3000, function(){
    console.log("Server started at port 3000");
});