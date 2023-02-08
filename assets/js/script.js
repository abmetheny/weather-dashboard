var currentWeather = document.getElementById('current-weather-container');
var searchButton = document.getElementById('search-button');


function suggestLocation() {

}

function getLocation() {
    var requestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=Richmond,VA,US&limit=5&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            latitude = data[0].lat;
            longitude = data[0].lon;
            console.log(latitude);
            console.log(longitude);

            getWeather();
            getForecast();
            
        })
}

function getWeather() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var weatherTemp = document.createElement('li');
            var weatherWind = document.createElement('li');
            var weatherHumidity = document.createElement('li');

            weatherTemp.innerHTML = 'Temp: ' + data.main.temp;
            weatherWind.innerHTML = 'Wind: ' + data.wind.speed;
            weatherHumidity.innerHTML = 'Humidity: ' + data.main.humidity;

            currentWeather.appendChild(weatherTemp);
            currentWeather.appendChild(weatherWind);
            currentWeather.appendChild(weatherHumidity);


        })
}

function getForecast() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
        })
}

getLocation();

searchButton.addEventListener('submit', suggestLocation);