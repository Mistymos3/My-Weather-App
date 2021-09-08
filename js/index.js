const currentDate = moment().format();
console.log(currentDate);
//openweathermap.org API key
const apiKey = '61371caa7f5d756c79ef18bb6118aec1'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=61371caa7f5d756c79ef18bb6118aec1'
// const icon
const fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=61371caa7f5d756c79ef18bb6118aec1'
const uvIndex = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=61371caa7f5d756c79ef18bb6118aec1'