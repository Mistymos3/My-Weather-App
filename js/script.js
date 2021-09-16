const date = moment().format("dddd, MMMM Do YYYY");
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

var longitute
var latitude


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



      // Constructing HTML containing weather information
      $("#city").text(response.name);
      $("#mainWeather").text(response.weather[0].main);
      $("#weatherDescription").text(response.weather[0].description);
      // $("icon").attr('src', buildIconUrl(response.weather[0].icon));
      //TEMPERATURE CONVERSION FROM KELVIN TO F
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $("#todaysTemp").html(tempF.toFixed(2) + " &deg;F");
      $("#todaysHum").text(response.main.humidity + " %");
      $("#todaysWind").text(response.wind.speed + " MPH");
  

//SAVE TO LOCAL STORAGE
    //   localStorage.setItem("weather", response.name)



              
        // localStorage.setItem("lat", response.coord.lat)
        // localStorage.setItem("lon", response.coord.lon)
UVindex(lat, lon);

            });
        }  

        //UV INDEX FUNCTION
        function UVindex(lat, lon) {
                        //    lat=33.44&lon=-94.04&exclude=hourly,daily&appid=61371caa7f5d756c79ef18bb6118aec1
            // var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?appid=" + apiKey + "&" + lat + "=&" + lon + "=&units=imperial"
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
                
            })

        }









//5 DAY FORECAST

function FIVEDayForcast(city) {
    var fivedayURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey

        //AJAX Call
        $.ajax({
        url: fivedayURL,
        method: "GET"
        }).then(function(response5Day) {
            console.log(response5Day);



        // var 
        });

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


  









    
//   var cityInput = $("#search-value").val().trim();
  
//   //variable that stores the Open Weather Map API for 5 day forecasts 
//   var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){
//     $("#5day").text("5-Day Forecast:")
    
  
//     //for loop that checks the data gotten from the API and returns items that include the time 15:00. 
//     //This ensures that only 1 hour is included per day, giving us our 5 day forecast.
//     for (var i=0; i<response.list.length; i++){
//       if (response.list[i].dt_txt.includes("15:00:00")){
//       //pushes the indexes that include 15:00 to the forecastArray
//       forecastArray.push(i);
//       //Gets the date for each included index 
//       var dates = response.list[i].dt_txt;
//       //formats the dates wiht the Moment API 
//       var datesFormat = moment(dates);
//       var datesFormat = moment(dates).format("MMMM/Do/YYYY");
//       //gets the components for each index and assingns them to a variable 
//       var datesTemp = response.list[i].main.temp;
//       var datesHumidity = response.list[i].main.humidity;
//       var datesIcon = response.list[i].weather[0].icon;
//       var iconURL = "http://openweathermap.org/img/w/" + datesIcon + ".png";

//         //creates cards, using the bootstrap template, that inlcude the date, icon, temperature, and humidity 
//       $("#cards").append(
//         '<div id="card' + i + '" class="card bg-info mx-3" style="width: 10rem;"><div class="card-body"><h5 class="card-title">Card title</h5><img src="" alt="Weather Icon"><p class="card-text temp">Temp: </p><p class="card-text humidity">Humidity: </p></div></div>'
//       );
//       //sets the text of each title to be the date for each card
//       $("#card"+i+" h5").text(datesFormat);
//       //appends the temperature for each card
//       $("#card"+i).find(".temp").append(datesTemp + "℉");
//       //appends the humidity for each card
//       $("#card"+i).find(".humidity").append(datesHumidity+"%");
//       //appends the icon for each card 
//       $("#card"+i).find("img").attr("src",iconURL);
   
//     }}
//     //stores the 5day forecast data in local storage 
//     localStorage.setItem("5Day", JSON.stringify(response));
      
//   })





















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



        





