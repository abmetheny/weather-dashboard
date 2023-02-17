var currentWeather = document.getElementById('current-weather-container');
var currentCity = document.getElementById('city-name');
var alert = document.getElementById('alert');
var currentHeader = document.getElementById('city-date');
var searchButton = document.getElementById('search-button');
var forecastHeader = document.getElementById('forecast-header');
var forecastWeather = document.getElementById('daily-forecast-container');
var previousSearch = document.getElementById('searches-container');
var buttons = document.querySelectorAll('.btn');

var searchInputVal = "";
var searchInputArray = [];
var previousStored = "";
var inputAttribute = "";

displayPreviousSearch();

function checkInput() {
    console.log(searchInputVal);
    var searchInputVal = document.querySelector('#city-name').value.replace(/\s+/g, '');
    searchButton.setAttribute('user-value', searchInputVal);
    console.log(searchInputVal);

    if (!searchInputVal) {
        alert.classList.remove('invisible');
        console.log("if");
        return;
    }

    else if (searchInputVal) {
        storePreviousSearch(searchInputVal);
        displayPreviousSearch();
        getLocation();
        console.log("else if");
    }

    else {
        getLocation();
        console.log("else");
    }
}

// Uses user input to query opeanweather API for city latitude and longitude
function getLocation(inputAttribute) {
    // searchInputVal = document.querySelector('#city-name').value.replace(/\s+/g, '');
    console.log(searchInputVal);
    
    alert.classList.add('invisible');
    inputAttribute = event.target.getAttribute('user-value');
    // console.log(inputAttribute);

    var requestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputAttribute + '&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            latitude = data[0].lat;
            longitude = data[0].lon;
            // console.log(latitude);
            // console.log(longitude);
            // console.log(inputAttribute);

            getWeather(inputAttribute);
            getForecast();
            
        })
 
    clearInput();
    removeNodes();

}

// Pushes user inputs into an array
function storePreviousSearch(searchInputVal) {
    searchInputArray.push(searchInputVal);
    // console.log(searchInputArray);
    for (i = 0; i < searchInputArray.length; i++) {
        localStorage.setItem(JSON.stringify(searchInputArray[i]), i);
    }
}

// Populates previous search container with previous searches sorted alphabetically
function displayPreviousSearch() {
    var storedSearchArray = {...localStorage};
    var storedSearchValues = Object.keys(storedSearchArray);
    storedSearchValues.sort();
    // console.log(storedSearchValues);
    previousSearch.innerHTML = '';

    for (let i = 0; i < storedSearchValues.length; i++) {
        previousStored = storedSearchValues[i].replace(/\"/g, "");
        // console.log(previousStored);
        
        var previousButton = document.createElement('button');
        previousButton.setAttribute('user-value', previousStored);
        previousButton.className = "previous-button btn btn-secondary btn-sm btn-block"
        previousButton.addEventListener('click', getLocation);
        
        previousButton.appendChild(document.createTextNode(previousStored));
        previousSearch.append(previousButton);
        
    }
    // previousButton.onclick = getLocation();
    // inputAttribute = event.target.getAttribute('user-value');
    
}

// Clears out the search field
function clearInput() {
    currentCity.value = '';
}

// Clears out the query result elements
function removeNodes() {
    currentHeader.innerHTML = '';
    currentWeather.innerHTML = '';
    forecastHeader.innerHTML = '';
    forecastWeather.innerHTML = '';
}

// Uses latitude/longitude inputs for an openweather API query to get and display current weather information for that city
function getWeather(inputAttribute) {
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&APPID=c4775d1a77795c9e3426b0f8b3ca1221';
    // console.log(inputAttribute);

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            // console.log(inputAttribute);

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
            currentHeader.innerHTML = inputAttribute + " (" + currentDay + ")  ";
            currentHeader.append(icon);

        })

}

// Function to create a new array of nth result from an API query
function getEveryNth(data, nth) {
    var result = [];

    for (var i = 0; i < data.length; i += nth) {
        result.push(data[i]);
    }

    return result;
}

// Uses latitude/longitude inputs for an openweather API query to get and display 5-day forecast weather information for that city 
function getForecast() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&APPID=c4775d1a77795c9e3426b0f8b3ca1221';

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            var data = data.list;
            // console.log(data);

            data = getEveryNth(data, 8);
            // console.log(data);

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

searchButton.addEventListener('click', checkInput);
// buttons.addEventListener('click', getLocation);