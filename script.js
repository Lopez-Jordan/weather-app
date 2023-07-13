$(document).ready(function() {
// global vars here 
var searchBtnEl = $("#searchBtn");

var lat;
var long;

function displayHistory(){

}


function getLat(name) {
    return new Promise((resolve, reject) => {
      var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead";
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var lat = data[0].lat;
          resolve(lat);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  
  function getLon(name) {
    return new Promise((resolve, reject) => {
      var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead";
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var lon = data[0].lon;
          resolve(lon);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
//MAIN FUNCTIONS ---------------------------------------------------------------------------------
function renderSearch(name, latitude, longitude){
    if (name === ""){
        return;
    }
    else {
        var newEl = $("<button>");
        newEl.text(name);
        newEl.attr("class", "historyBtn");
        $("#history").append(newEl);
    }
    localStorage.setItem(name, JSON.stringify({lat: latitude, lon: longitude}));
}
function renderMain(name, latitude, longitude){
    $("#main h2").text(name);

    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=9bce6875713db412816a04531af13ead&units=imperial";
    
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            $("#main h2").text(name +" " + dayjs().format('MM/DD/YY'));
            $("#main h4").first().text("Temp: "+ data.main.temp + " °f");
            $("#main h4").eq(1).text("Wind: "+ data.wind.speed + " mph");
            $("#main h4").eq(2).text("Humidity: "+ data.main.humidity + " %");
            renderFiveDay(name, latitude, longitude);
        });
}


////////////////////////////////////////////////////////////////////////////////////////////////
function renderFiveDay(name, latitude, longitude){
  var timeNum = 7;
  $("#genCards").empty();
  var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=9bce6875713db412816a04531af13ead&units=imperial";
  fetch(url)
    .then(function (response){
      return response.json();
    })
    .then(function(data){
      for(var i=1; i<=5;i++){
        
        var newCardEl = $("<div>");
        newCardEl.attr("class","cardElStyle");

        var newDayEl = $("<h5>").text(dayjs().add(i,'day').format("MM/DD/YY")).css("color", "white");
        var newTempEl = $("<h5>").text("Temp: " + data.list[timeNum].main.temp + " °f").css("color", "white");
        var newWindEl = $("<h5>").text("Wind: " + data.list[timeNum].wind.speed + " mph").css("color", "white");
        var newHumEl = $("<h5>").text("Hum: "+ data.list[timeNum].main.humidity + " %").css("color", "white");

        

        newCardEl.append(newDayEl);
        newCardEl.append(newTempEl);
        newCardEl.append(newWindEl);
        newCardEl.append(newHumEl);

        $("#genCards").append(newCardEl)

        timeNum += 7;
        // generate card
        // generate class
        // append to #genCards
      }
    });


  for(var i=0; i<5;i++){
    // generate card
    // generate class
    // append to #genCards
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////
searchBtnEl.on("click", async function() {
    var inputCity = $("#inputCity").val();
    var lat = await getLat(inputCity);
    var lon = await getLon(inputCity);
    renderSearch(inputCity, lat, lon);
    renderMain(inputCity, lat, lon);
  });


function init(){
    displayHistory(); //displays history from local storage and appends to display div
} 
init();

});