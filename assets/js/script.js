var currentWeather = document.getElementById('current-weather-container');
var searchButton = document.getElementById('search-button');
var forecastWeather = document.getElementById('forecast-container');


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
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var weatherTemp = document.createElement('li');
            var weatherWind = document.createElement('li');
            var weatherHumidity = document.createElement('li');

            weatherTemp.innerHTML = 'Temp: ' + data.main.temp + '\u00B0F';
            weatherWind.innerHTML = 'Wind: ' + data.wind.speed +'mph';
            weatherHumidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';

            currentWeather.appendChild(weatherTemp);
            currentWeather.appendChild(weatherWind);
            currentWeather.appendChild(weatherHumidity);


        })
}

function getForecast() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var data = data.list;
            console.log(data);

            for (var i = 0; i < 5; i++) {
                
                var div = document.createElement('div');
                var date = document.createElement('li');
                var icon = document.createElement('li');
                var temp = document.createElement('li');
                var wind = document.createElement('li');
                var humidity = document.createElement('li');

                date.innerHTML = data[i].dt;
                icon.innerHTML = data[i].weather[0].icon ;
                temp.innerHTML = 'Temp: ' + data[i].main.temp + '\u00B0F';
                wind.innerHTML = 'Wind: ' + data[i].wind.speed +'mph';
                humidity.innerHTML = 'Humidity: ' + data[i].main.humidity + '%';
                                   
                // Adds the li element to the HTML id 
                forecastWeather.appendChild(div);
                forecastWeather.appendChild(date);
                forecastWeather.appendChild(icon);
                forecastWeather.appendChild(temp);
                forecastWeather.appendChild(wind);
                forecastWeather.appendChild(humidity);

           

        }
            
        })
}

getLocation();

searchButton.addEventListener('submit', suggestLocation);