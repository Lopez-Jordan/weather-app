$(document).ready(function() {


// global vars here 
var searchBtnEl = $("#searchBtn");



function getLat(name){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead"
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            return data[0].lat;
        });
}

function getLon(name){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=9bce6875713db412816a04531af13ead"
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            return data[0].lon;
        });
}


//MAIN FUNCTIONS ---------------------------
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

    getLat(inputCity);
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