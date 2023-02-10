var currentWeather = document.getElementById('current-weather-container');
var currentCity = document.getElementById('city-name');
var currentHeader = document.getElementById('city-date');
var searchButton = document.getElementById('search-button');
var forecastHeader = document.getElementById('forecast-header');
var forecastWeather = document.getElementById('daily-forecast-container');

var searchInputVal = "";

// function checkInputs() {
//     if (currentHeader == "") {
//         getLocation();
//     } else {
//         clearInput();
//         removeNodes();
//         getLocation();
//     }
// }

// function clearInput() {
//     currentCity.value = '';
// }

// function removeNodes() {
//     currentWeather.innerHTML = '';
//     currentHeader.innerHTML = '';
//     forecastHeader.innerHTML = '';
//     forecastWeather.innerHTML = '';
// }

function getLocation() {
    searchInputVal = document.querySelector('#city-name').value.replace(/\s+/g, '');
    console.log(searchInputVal);
    var requestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInputVal + '&APPID=c4775d1a77795c9e3426b0f8b3ca1221';


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

    function clearInput() {
        currentCity.value = '';
    }

    function removeNodes() {
        currentWeather.innerHTML = '';
        currentHeader.innerHTML = '';
        forecastHeader.innerHTML = '';
        forecastWeather.innerHTML = '';
    }

    clearInput();
    removeNodes();

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

            var currentDay = dayjs().format('M/D/YYYY');
            var icon = document.createElement('img');
            icon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
            currentHeader.innerHTML = searchInputVal + " (" + currentDay + ")  ";
            currentHeader.append(icon);

        })

}
// new Date
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

            function getEveryNth(data, nth) {
                var result = [];

                for (var i = 0; i < data.length; i += nth) {
                    result.push(data[i]);
                }

                return result;
            }

            data = getEveryNth(data, 8);
            console.log(data);

            for (var i = 0; i < 5; i++) {

                var div = document.createElement('div');
                div.className = "col border";
                var date = document.createElement('li');
                var icon = document.createElement('img');
                var temp = document.createElement('li');
                var wind = document.createElement('li');
                var humidity = document.createElement('li');

                forecastHeader.innerHTML = '5-Day Forecast:';
                date.innerHTML = data[i].dt_txt;
                icon.src = 'http://openweathermap.org/img/wn/' + data[i].weather[0].icon + '@2x.png';
                temp.innerHTML = 'Temp: ' + data[i].main.temp + '\u00B0F';
                wind.innerHTML = 'Wind: ' + data[i].wind.speed +'mph';
                humidity.innerHTML = 'Humidity: ' + data[i].main.humidity + '%';
                                   
                // Adds the li element to the HTML id 
                forecastWeather.appendChild(div);
                div.appendChild(date);
                div.appendChild(icon);
                div.appendChild(temp);
                div.appendChild(wind);
                div.appendChild(humidity);

           

        }
            
        })
}


searchButton.addEventListener('click', getLocation);