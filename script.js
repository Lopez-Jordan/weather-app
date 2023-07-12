$(document).ready(function() {
// global vars here 
var searchBtnEl = $("#searchBtn");

var lat;
var long;

function getLat(name) {
    return new Promise((resolve, reject) => {
      var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead";
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var lat = data[0].lat;
          console.log(lat);
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
          console.log(lon);
          resolve(lon);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
//MAIN FUNCTIONS ---------------------------------------------------------------------------------
function renderHistory(name){
    if (name === ""){
        return;
    }
    else {
        var newEl = $("<button>");
        newEl.text(name);
        newEl.attr("class", "historyBtn");
        $("#history").append(newEl);
    }
}
function renderMain(name){
    $("#main h2").text(name);
}
function renderFiveDay(name){
}

searchBtnEl.on("click", async function() {
    var inputCity = $("#inputCity").val();

    var lat = await getLat(inputCity);
    var lon = await getLon(inputCity);
    console.log(lat + " " + lon);

    renderHistory(inputCity);
    renderMain(inputCity);
    renderFiveDay(inputCity);


    
  });

// on click "search"
    //render history
        // create a button with that city name
        // save it to local storage
    // render main
    // render 5-day forecast

});