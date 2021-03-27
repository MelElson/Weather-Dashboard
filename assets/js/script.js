var weatherContainer = document.getElementById('weather');
var forecastContainer = document.getElementById('five-day');
var historyContainer = document.getElementById('history');
var searchValueInputEl = document.querySelector('#search-value');
var searchButton = document.getElementById('search-button');

var APIkey = 'd510129f0bc104559e5e78714e1b6d72';



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
      var cityEl = document.createElement('h3');
      cityEl.textContent = data.name;
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
      cityEl.appendChild(weatherIcon);

      var currentDate = document.createElement("span")
      currentDate.textContent = " (" + moment(data.value).calendar("MMM D, YYYY") + ") ";
      cityEl.appendChild(currentDate);

      //put all var into container
      weatherContainer.innerHTML = '';
      weatherContainer.append(cityEl, temp, humidity, windSpeed);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      getUVIndex(lat, lon);
      //cities in search on left side

      var searchNameEl = document.createElement('h3')
      searchNameEl.textContent = data.name;
      window.localStorage.setItem("h2", data.name);
      window.localStorage.getItem("h2");
      historyContainer.append(searchNameEl);

    });

}

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
  
  var searchValue = document.getElementById('search-value').value;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${APIkey}`;
    
  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
     
      forecastContainer.innerHTML = '';
      for(let i=0; i < data.list.length; i +=8) {
        var div = document.createElement("div");
        div.style.display = "inline-block";
        div.setAttribute('class', 'col-md-2  col-sm-4')
      
      
      //date
      var fivecurrentDate = document.createElement("span")
      fivecurrentDate.textContent = moment(data.list[i].dt_txt).calendar("MMM D, YYYY");
      div.appendChild(fivecurrentDate);

      var temp5 = document.createElement('span');
      temp5.textContent =  "Temp: " + data.list[i].main.temp  + " F";
      temp5.classList = "five-day-list-group";
      div.appendChild(temp5);
      
      
      //humidity
      var fivehumidity = document.createElement('span');
      fivehumidity.textContent = "Humidity: " + data.list[i].main.humidity  + "% ";
      fivehumidity.classList = "five-day-list-group";
      div.appendChild(fivehumidity);
      
      //pic icon for weather
      var pic = data.list[i].weather[0].icon
      var fiveweatherIcon = document.createElement("img")
      fiveweatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${pic}@2x.png`);
      div.appendChild(fiveweatherIcon);

      
     
     div.appendChild(temp5);
     forecastContainer.appendChild(div);

     }

    })

    
}

searchButton.addEventListener('click', getApi);
searchButton.addEventListener('click', getFiveDay);
window.addEventListener("load", function () {
  window.localStorage.getItem("history")
})
