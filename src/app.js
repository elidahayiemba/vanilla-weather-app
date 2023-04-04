function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;   
  } 

  if (minutes < 10) {
    minutes = `0${minutes}`;   
  } 
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;

}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]
  days.forEach(function(day){
    forecastHTML = 
  forecastHTML + 
  `
  
  <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="" width="42px">
      <div class="weather-forecast-temperature">
          <span class="max-temp">18°</span>
          <span class="min-temp">12°</span>

      </div>
  </div>
  `;  
  });
  

forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;


  
}

function getForecast(coordinates){
  let apiKey = "b98d12bde72f31eae25d84b6d0a808dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);


}







function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")


    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);

}
function search(city){
  let apiKey = "b98d12bde72f31eae25d84b6d0a808dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}


search("New York");



  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);


