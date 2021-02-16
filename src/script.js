let currentTime = new Date();
console.log(new Date());
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];
console.log(days[currentTime.getDay()]);
let hours = currentTime.getHours();
console.log(currentTime.getHours());
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
console.log(currentTime.getMinutes());
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("#current-date");
currentDayTime.innerHTML = `${day} ${hours}: ${minutes}`;


function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
    
}

function searchCity(city) {
  let apiKey = "0a563fcaebc2d7ba86421e3b0a9eefb0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("click", handleSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "0a563fcaebc2d7ba86421e3b0a9eefb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getPosition);

searchCity("Nicosia");