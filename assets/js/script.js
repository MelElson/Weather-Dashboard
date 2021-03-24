var weatherContainer = document.getElementById('weather');
var fiveDayContainer = document.getElementById('five-day');
var historyContainer = document.getElementById('history');
var searchValueInputEl= document.querySelector('#search-value');
var searchButton = document.getElementById('search-button');
var cityHistoryButtonEl = document.querySelector("#city-history-button"); ///turn city list into button so it can be clicked on

var APIkey = '';



function getApi() {
  var searchValue = document.getElementById('search-value').value;
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $('#search-value').val('')
     //temp
      var temp = document.createElement('span');
      temp.textContent = "Temp: " + data.main.temp + " F";
      temp.classList = "list-group";
     
      //search city
      var cityNameEL = document.createElement('h3');
      cityNameEL.textContent = data.name;
      //humidity
      var humidity = document.createElement('span');
      humidity.textContent = "Humidity: " + data.main.humidity + "% ";
      humidity.classList = "list-group";
      //wind speed
      var windSpeed = document.createElement('span');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph ";
      windSpeed.classList = "list-group";
      //weather icon next to city
      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityNameEL.appendChild(weatherIcon);

      var currentDate = document.createElement("span")
      currentDate.textContent=" (" + moment(data.value).calendar("MMM D, YYYY") + ") ";
      cityNameEL.appendChild(currentDate);

     //put all var into container
     weatherContainer.innerHTML = '';
      weatherContainer.append(cityNameEL, temp, humidity, windSpeed);

      //cities in search on left side
      var searchNameEl = document.createElement('h2')
      searchNameEl.textContent = data.name;
    
      window.localStorage.setItem("h2", data.name);
      historyContainer.append(searchNameEl);
      //window.localStorage.getItem("h2");
    
      

      var lon = data.coord.lon;
      var lat = data.coord.lat;
      getUVIndex(lat, lon);
     
      


    });

///is this working?
}
window.addEventListener("load",function() {
  window.localStorage.getItem("history")
})



// UV Index
function getUVIndex(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var UVIndex = document.createElement('span');
      UVIndex.textContent = "UV Index: " + data.value;
      console.log(data.value)
      UVIndex.classList = "list-group"
      weatherContainer.appendChild(UVIndex);
    })
}

// five day forecast
function getFiveDay() {
  var weatherIcon = document.createElement("img")

  var searchValue = document.getElementById('search-value').value;
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${APIkey}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var fiveDay = document.createElement('span');
      fiveDay.textContent = "5 Day Forecast: " + data.value;
      console.log(data.value)
      fiveDay.classList = "list-group"
      weatherContainer.appendChild(fiveDay);
    })



}

searchButton.addEventListener('click', getApi);


