const currentDate = moment().format("dddd, MMMM Do YYYY");
console.log(currentDate);
const historyKey = 'history'
console.log(historyKey)

//openweathermap.org API key
const apiKey = '61371caa7f5d756c79ef18bb6118aec1'
// need to add ... to get current weather of any city    q={City}&appid=61371caa7f5d756c79ef18bb6118aec1
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?"
//  need to add ...   q={city name}&appid=61371caa7f5d756c79ef18bb6118aec1
const fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?'
//lat=33.44&lon=-94.04&exclude=hourly,daily&appid=61371caa7f5d756c79ef18bb6118aec1
const uvIndex = "https://api.openweathermap.org/data/2.5/onecall?"
// q={cityName}&appid=61371caa7f5d756c79ef18bb6118aec1
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?'
  

console.log(apiKey)
console.log(fiveDayForecast + 'q=Denver&appid=' + apiKey)


function buildCurrentWeather(citySearch) {
    
    let queryParameters = {
        'appid' : apiKey,
        'q' : citySearch,
        'units' : 'metric',
        // 'units' : 'imperial',
    }
console.log(weatherURL + $.param(queryParameters))
// return weatherURL + $.param(queryParameter)
}


//USE ENTER BUTTON AS WELL AS MOUSE CLICK FOR SEARCH 
//   const input = document.querySelector('.search-button');
//   input.addEventListener("keyup", function(event) {
//     if (event.keyCode === 13) {
//         getResults(input.value);
//     }
//   });

function buildUVindex(lat, lon) {
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParameter = {
        'appid' : apiKey,
        'lat' : lat,
        'lon' : lon,
        'units' : 'metric',
        // 'units': 'imperial',
    }
 console.log(uvIndex + $.param(queryParameter))
    // return uvIndex + $.param(queryParameter)
}

function iconURL(iconID) {
    return `${iconURL}${iconID}@2x.png`
    // http://openweathermap.org/img/wn/10d@2x.png
}



// CLICK HANDLERS
// ==========================================================
// .on("click") function associated with the Search Button
$("#search-button").on("click", function(event) {
    let searchValue = $("#search-value").val().trim()
    addHistory(searchValue)
    storeHistory()

    // Build the query URL for the ajax request to the API
    let queryURL = buildCurrentWeather(searchValue)
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(updateCurrentWeather)
})



$("#history").on('click', '.history', function (event) {
    let searchValue = event.currentTarget.innerText
    // Build the query URL for the ajax request to the API
    let queryURL = buildCurrentWeather(searchValue)

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(updateCurrentWeather)
})

// Clear history with button
$("#clearHistory").on("click", function (event) {
    localStorage.removeItem(historyKey)
    $("#history").empty()
})

// Load history
loadHistory()
function loadHistory() {
    let history = localStorage.getItem(historyKey)
    if (history) {
        let storedNames = JSON.parse(history)
console.log(storedNames)
        for (let i = storedNames.length; i > 0; i--) {
            let history = storedNames[i - 1]
            if (history != '') {
                addHistory(history)
                console.log(`${i} ${history}`)
            }
        }
    }
}


/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} weatherData - object containing API data
 */
 function updateCurrentWeather(weatherData) {
    let date = DateTime.fromSeconds(weatherData.dt).toLocaleString(DateTime.DATE_SHORT)
console.log(date)

    // Log the weatherData to console, where it will show up as an object
    console.log(weatherData)
    $("#city").text(`${weatherData.name} ${date}`)
    $("#todaysTemp").html(`Temperature: ${weatherData.main.temp} &deg;C`)
    $("#todaysHum").html(`Humidity: ${weatherData.main.humidity} %`)
    $("#todaysWind").html(`Wind Speed: ${weatherData.wind.speed} MPH`)
    $("#icon").attr('src', buildIcon(weatherData.weather[0].icon))
    // Build the query URL for the ajax request to the API
    let uvIndex = buildUVindex(weatherData.coord.lat, weatherData.coord.lon)



    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: uvIndex,
        method: "GET",
    }).then(updateUVindex)
}

/**
* takes API data (JSON/object) and turns it into elements on the page
* @param {object} weatherData - object containing API data
*/
function updateUVindex(weatherData) {
    let uvi = weatherData.current.uvi

    // Log the weatherData to console, where it will show up as an object
    console.log(weatherData)
    $("#todaysUv").html(`UV Index: &nbsp;<div id="uvColor">&nbsp;${uvi}&nbsp;</div>`)
    if (uvi < 3) {
        $("#uvColor").attr('style', 'background:greenyellow;')
    } else if (uvi < 6) {
        $("#uvColor").attr('style', 'background:yellow;')
    } else if (uvi < 8) {
        $("#uvColor").attr('style', 'background:orange;')
    } else if (uvi < 11) {
        $("#uvColor").attr('style', 'background:red;color:white;')
    } else {
        $("#uvColor").attr('style', 'background:violet;')
    }

    for (let i = 0; i <= 5; i++) {
        updateForecast(i, weatherData.daily[i])
    }
}



function updateForecast(i, forecast) {
    console.log(forecast)
    let date = DateTime.fromSeconds(forecast.dt).toLocaleString(DateTime.DATE_SHORT)
    $(`#date${i}`).text(date)
    $(`#icon${i}`).attr('src', buildIcon(forecast.weather[0].icon))
    $(`#temp${i}`).html(`Temperature: ${forecast.temp.day} &deg;C`)
    $(`#humidity${i}`).html(`Humidity: ${forecast.humidity} %`)
    $("#forecast").removeClass('hide')
}

function addHistory(cityHistorySearch) {
    // Log the cityHistorySearch to console, where it will show up as an object
    console.log(cityHistorySearch)

    // Create list group to contain cities and add the city search results content for each
    let $cityHistoryEl = $("<div>")
    $cityHistoryEl.addClass("history")
    $cityHistoryEl.addClass("pointer")
    $cityHistoryEl.addClass("clickable-row")
    $cityHistoryEl.text(cityHistorySearch)

    // Add newly created element to DOM
    $("#history").prepend($cityHistoryEl)
}

function storeHistory() {
    let histories = []
    $('.history').each(function () {
        histories.push($(this).text())
    })
    localStorage.setItem(historyKey, JSON.stringify(histories))
}














//   function getResults (query) {
//     fetch(`${api.queryURL}weather?q=${query}&units=metric&appid=${api.key}`)
//       .then(weather => {
//         return weather.json();
//       }).then(displayResults);
//   }
  
//   function displayResults (weather) {
//     let city = document.querySelector('.location .city');
//     city.innerText = `${weather.name}, ${weather.sys.country}`;
  
//     let now = new Date();
//     let date = document.querySelector('.location .date');
//     date.innerText = dateBuilder(now);
  
//     let temp = document.querySelector('.current .temp');
//     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
//     let weatherEl = document.querySelector('.current .weather');
//     weatherEl.innerText = weather.weather[0].main;
  
//     // let hilow = document.querySelector('.hi-low');
//     // hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
//   }
  
//   function dateBuilder (d) {
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();
  
//     return `${day} ${date} ${month} ${year}`;
//   }