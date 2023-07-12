$(document).ready(function() {
// global vars here 
var searchBtnEl = $("#searchBtn");

var lat;
var long;

function getLat(name){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead"
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            lat = data[0].lat;
            console.log(lat);
            return lat;
        });
}
function getLon(name){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead"
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            long = data[0].lon;
            console.log(long);
            return long;
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

searchBtnEl.on("click",function(){
    var inputCity = $("#inputCity").val();
    
    console.log(getLat(inputCity) + " " + getLon(inputCity));


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