const date = moment().format("dddd, MMMM Do, YYYY");
// console.log(date);

//openweathermap.org API key
const apiKey = '61371caa7f5d756c79ef18bb6118aec1'
// need to add ...    {City}&appid=61371caa7f5d756c79ef18bb6118aec1
// const weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=61371caa7f5d756c79ef18bb6118aec1';
//  need to add ...   {city name}&appid=61371caa7f5d756c79ef18bb6118aec1
// const fiveDayForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=61371caa7f5d756c79ef18bb6118aec1';
//lat=33.44&lon=-94.04&exclude=hourly,daily&appid=61371caa7f5d756c79ef18bb6118aec1
// const uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?" + lat + lon + "&exclude=hourly,daily&appid=61371caa7f5d756c79ef18bb6118aec1";

// const iconURL = 'http://openweathermap.org/img/wn/'

// var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
//  'https://api.openweathermap.org/data/2.5/onecall?lat=' +  lat + '&lon=' + lon + '&exclude=hourly,daily&appid=' + apiKey;// var UVIqueryURL =
// console.log(apiKey)

// console.log(queryURL);
// console.log(UVIqueryURL);

// var longitute
// var latitude


//put DATE ON PAGE
$("#todaysDate").html(date);


//CURRENT WEATHER FUNCTION ... adding in uv function inside current weather function
function displayCurrentWeather(city) {
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;    

    //AJAX CALL
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

         // Printing the entire object to console
      console.log(response);
    //   console.log(response.coord.lon, response.coord.lat);

//variables containing longitude and latitude for uvIndexURL
var lat = (response.coord.lat)
var lon = (response.coord.lon)
// var icon = (response[0].icon)
// latitude = lat;
// longitute = lon;


//Gets the icon for the current weather
var icon = response.weather[0].icon;
var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
// http://openweathermap.org/img/w/04d.png
//sets the icon 
$("#icon").attr('src', iconUrl);



      // Constructing HTML containing weather information
      $("#city").text(response.name);
      $("#mainWeather").text(response.weather[0].main);
      $("#weatherDescription").text(response.weather[0].description);
    //   $("#icon").attr('src', (response.weather[0].icon))
      //TEMPERATURE CONVERSION FROM KELVIN TO F
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $("#todaysTemp").html(tempF.toFixed(2) + " &deg;F");
      $("#todaysHum").text(response.main.humidity + " %");
      $("#todaysWind").text(response.wind.speed + " MPH");
  

//SAVE TO LOCAL STORAGE
      localStorage.setItem("weather", response.name)
      localStorage.setItem("lat", response.coord.lat)
      localStorage.setItem("lon", response.coord.lon)


UVindex(lat, lon);
 fiveDayForecast(response);
// fiveDayForecast(city)
            });
        }  


        //UV INDEX FUNCTION
        function UVindex(lat, lon) {
            
            var uvIndexUrl = "https://api.openweathermap.org/data/2.5/onecall?&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon
            //AJAX CALL
            $.ajax({
            url: uvIndexUrl, 
            method: "GET"
            }).then(function(response1) {

                //print entire object to console
                console.log(response1);

                // Constructing HTML containing uvIndex
                $("#todaysUV").text(response1.current.uvi)
          




                    //UV INDEX DIV TO CHANGE COLOR WITH DIFFERENT INDEX NUMBERS        
             
                    let uvi = response1.current.uvi
                
                    // Log the weatherData to console, where it will show up as an object
                    console.log(uvi)

                    $("#todaysUV").html(`<div id="uvColor">${uvi}</div>`)
                    if (uvi < 3) {
                        $("#uvColor").attr('style', 'background-color: #34fd025b;')
                    } else if (uvi < 6) {
                        $("#uvColor").attr('style', 'background-color: #c7fd025b;')
                    } else if (uvi < 8) {
                        $("#uvColor").attr('style', 'background-color: #fdad025b;')
                    } else if (uvi < 11) {
                        $("#uvColor").attr('style', 'background-color: #fd02025b;')
                    } else {
                        $("#uvColor").attr('style', 'background-color: #0206fd5b;')
                    }
                
                for (var i = 1; i <= 5; i++) {             
                fiveDayForecast(i, response1.daily[i]);
                };
               
            })

        }






function fiveDayForecast(i, forecast) {
    console.log(forecast);

    // let date = moment(forecast.dt_txt).format("MMMM Do, YYYY");
    $(`#date${i}`).text(date)
    // $(`#icon${i}`).attr("src", icon(forecast.weather[0].icon))
    var tempF = (forecast.temp.day - 273.15) * 1.80 +32;
    $(`#temp${i}`).html(`${tempF.toFixed(2)} ℉`)
    $(`#hum${i}`).html(`${forecast.humidity} %`)
    $(`#wind${i}`).html(`${forecast.wind_speed} MPH`)
}




// search button mouse click handler
$("#search-button").on("click", function(event) {
    // Preventing the button from trying to submit the form

    event.preventDefault();
    // Storing city name
    var search = $("#search-value").val().trim();


    // Running the displayCurrentWeather function(passing in the city as an argument)
    displayCurrentWeather(search);
    // display5DayForcast(search);
  });


  






//TRYING TO GET ICON
                // function currentIcon() {

                // }



//WANT TO HIDE THEN REMOVE HIDE WHEN ENTER KEY IS HIT
    //   $(".todayDisplay").removeclass("hide");
    //   $(".forecastDisplay").removeClass("hide");
















// Code for temperature conversion
    // var fahrenheit = true;

    // $("#convertToCelsius").click(function() {
    //     if (fahrenheit) {
    //         $("#todaysTemp").text(((($("#todaysTemp").text() - 32) * 5) / 9));
    //     }
    //     fahrenheit = false;
    // });

    // $("#convertToFahrenheit").click(function() {
    //     if (fahrenheit == false) {
    //         $("#todaysTemp").text((($("#todaysTemp").text() * (9/5)) + 32));
    //     }
    //     fahrenheit = true;
    // });



        





