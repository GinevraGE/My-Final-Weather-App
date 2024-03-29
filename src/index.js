function formatMonth(today) {
  let todayIndex = now.getDate();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentMonth];
  return `${todayIndex}, ${month}. ${currentYear}`;
}
let now = new Date();
let todayElement = document.querySelector("#month-year");
todayElement.innerHTML = formatMonth(now);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"> `;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temps">
                  <span class="weather-forecast-temp-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}°</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `dfa836f02b3ot61e0f995ec04f06a183`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = `dfa836f02b3ot61e0f995ec04f06a183`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//function showFahrenheitTemp(event) {
//event.preventDefault();

//let temperatureElement = document.querySelector("#temperature");
//celsiusLink.classList.remove("active");
//fahrenheitLink.classList.add("active");
//let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
// temperatureElement.innerHTML = Math.round(fahrenheitTemp);
//}

//function showCelsiusTemp(event) {
// event.preventDefault();
//celsiusLink.classList.add("active");
//fahrenheitLink.classList.remove("active");
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = Math.round(celsiusTemperature);
//}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", showFahrenheitTemp);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", showCelsiusTemp);

search("Parma");

function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}
let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

function clickNewsButton() {
  let newsButton = document.querySelector(".news-info");
  newsButton.addEventListener("click", clickNewsButton);
}
