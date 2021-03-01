function formatDate(timestamp) {
  let date= new Date (timestamp);
 
  
  let days=[
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  let day=days[date.getDay()];
   return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function displayWeather(response) {
  celsiusTemperature=response.data.main.temp
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed *3.6);
  document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#last-updated").innerHTML=`Last updated: ${formatDate(response.data.dt*1000)}`
  let iconElement=document.querySelector("#icon")
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );
  iconElement.setAttribute("alt", response.data.weather[0].description)
  
}
  function displayForecast(response){
    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML=null;
    let forecast=null;

    for(let index = 0; index < 8; index++){
      forecast=response.data.list[index];
      forecastElement.innerHTML+=`<div class="col-sm-3">
      <div class="card">
      <div class="card-body">
              <h5>${formatHours(forecast.dt*1000)}
              <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="forecast-icon" height="65px" width="65px"/></h5>
              <h4 class="weather-forecast-temperature"><span id="forecast-celsius">${Math.round(forecast.main.temp_max)}°</span> | ${Math.round(forecast.main.temp_min)}°
              </h4>
         </div>  
         </div>   
        </div>`;
    }
  }
    
 function searchCity(city) {
  let apiKey = "0a563fcaebc2d7ba86421e3b0a9eefb0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`

  axios.get(apiUrl).then(displayWeather);
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("click", handleSubmit);
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "0a563fcaebc2d7ba86421e3b0a9eefb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getPosition);

function displayFahrenheit (event){
event.preventDefault();
let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
let temperatureElement=document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#temperature")
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let celsiusTemperature=null;
let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit)
let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

searchCity("Nicosia");