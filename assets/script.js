//global variables
let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
let searchResultEl = document.getElementById('search-result');
let resultCityEl = document.getElementById('search-result-city');
let currentDateEl = document.getElementById('current-date');
let currentWeatherIcon = document.getElementById('current-weather-icon');
let resultTempEl = document.getElementById('search-result-temp');
let resultWindEl = document.getElementById('search-result-wind');
let resultHumidityEl = document.getElementById('search-result-humidity');
let resultUVIndexEl = document.getElementById('search-result-uv-index');

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const openWeatherApiUrl = "https://api.openweathermap.org/data/2.5";
const apiKey = '3ab673231f1f0f7ca19b74198c8a06f2';
const excludeProps = 'minutely,hourly,alerts';

function init() {
  searchResultEl.classList = 'd-none';

}

async function getApi(e) {
  e.preventDefault();
  let searchKeyword = searchInput.value;
  let weatherUrl = `${openWeatherApiUrl}/weather?q=${searchKeyword}&appid=${apiKey}`;
  let cityDetails = await fetch(weatherUrl).then(response => response.json());
  const coordinates = cityDetails.coord;

  let oneCallUrl = `${openWeatherApiUrl}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&exclude=${excludeProps}&appid=${apiKey}`;
  let weatherDetails = await fetch(oneCallUrl).then(response => response.json());
  console.log(weatherDetails);
  displayCurrentWeather(cityDetails.name, weatherDetails.current);
  displayWeatherForecast(weatherDetails.daily)
}

function displayCurrentWeather(city, currentWeather) {
  resultCityEl.textContent = city;
  currentDateEl.textContent = new Date().toLocaleDateString();
  currentWeatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png">`;
  resultTempEl.textContent = currentWeather.temp;
  resultWindEl.textContent = currentWeather.wind_speed;
  resultHumidityEl.textContent = currentWeather.humidity;
  resultUVIndexEl.innerHTML = `<span class="badge badge-${getColorClass(currentWeather.uvi)}">${currentWeather.uvi}</span>`;
  searchResultEl.classList = 'd-block';
}

function displayWeatherForecast(dailyForecast) {
  dailyForecast.forEach(foreCast => {
    console.log(foreCast.temp.day);
    console.log(foreCast.wind_speed);
    console.log(foreCast.humidity);
  });
}

// utility functions 

function getColorClass(value) {
  return value >= 8 ? 'danger' :
    value > 3 ? 'warning' :
      'success';
}

init();
searchBtn.addEventListener('click', getApi);