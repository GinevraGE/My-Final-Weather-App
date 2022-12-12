function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#weather-description");
  conditionElement.innerHTML = response.data.condition.description;
}

let apiKey = `dfa836f02b3ot61e0f995ec04f06a183`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={Parma}&key=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
