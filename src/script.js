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
  let hours= date.getHours();
  if (hours <10) {
    hours= `0${hours}`;
  }
  let minutes=date.getMinutes();
  if (minutes <10) {
    minutes=`0${minutes}`
  }
 
  return `${day} ${hours}: ${minutes}`

}
function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-date").innerHTML=`Last updated: ${formatDate(response.data.dt*1000)}`
  let iconElement=document.querySelector("#icon")
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );
  iconElement.setAttribute("alt", response.data.weather[0].description)
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
searchForm.addEventListener("submit", handleSubmit)

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