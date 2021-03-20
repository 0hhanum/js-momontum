const weather = document.querySelector(".js-weather");

const api = "14934827b82e3dd644968d2ad7342ca8"
const COORDS = 'coords'

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`)
        .then(function(response) {
            return response.json()
        }).then(function (json){
            const temp = json.main.temp,
            place = json.name;
            weather.innerText = `${temp}˚C @ ${place}`    ;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    const coordsObs = {
        latitude, longitude
    };
    saveCoords(coordsObs);
    getWeather(coordsObs.latitude, coordsObs.longitude);
}

function handleGeoError(){
    console.log("Can't access geo location")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();