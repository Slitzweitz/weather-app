/* project requires jQuery
    assumes a simple file structure:
      |--index.html
      |--weather.js
      |--main.css
    */

function getLocation() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
   } else {
       $(".lat").append("Geolocation is not supported by this browser.");
   }
};

function showPosition(position) {
  var sliceLat= position.coords.latitude.toString().split(".");
  var sliceLon= position.coords.longitude.toString().split(".");

  var weatherApiCoordUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + sliceLat[0] + "&lon="+ sliceLon[0] +"&appid=06fa8726f51bc5310311a7038630653d";
  console.log(weatherApiCoordUrl);
  $.getJSON(weatherApiCoordUrl, function(res) {
      var temperature =  res.main.temp;
      var cels = temperature;
      cels = (cels - 273.18).toFixed(1);
      temperature = (temperature - 273.18) * 1.8 + 32;
      temperature = parseFloat((temperature).toFixed(1));
      $(".temp").html(temperature + " " + "degrees Farenheit and " + cels + " in Celsius and for nerds, " + res.main.temp + " in Kelvin!");
      var clouds = res.weather[0].description;
      $('.clouds').append(clouds);
      var wind = res.wind.speed;
      var direction = res.wind.deg;
      var value = Math.floor((direction / 22.5) + .5);
      arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
      direction = arr[(value % 16)];
      $('.wind').append(direction);
      $('.wind').append(" " + wind + " " + "MPH");
    });
};
getLocation();
