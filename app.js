const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionsOutput = document.querySelector('.conditions');
const nameOutput = document.querySelector('.city__name');
const icon = document.querySelector('.weather__icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const perceivedTempOutput = document.querySelector('.perceived__temp');
const cityNameOutput = document.querySelector('.city__details--name');
const cityRegionOutput = document.querySelector('.city__region');
const cityCountryOutput = document.querySelector('.city__country');
const form = document.getElementById('location__input');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
    
    fetchWeatherData();

    app.style.opacity = "0";
    }); 
});

form.addEventListener('submit', (e) => {
    if(search.value.length == 0) {
        alert("Please type in a city name");
    } else {
        cityInput = search.value;

        fetchWeatherData();

        search.value = "";

        app.style.opacity = "0";
    }

    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData() {

    fetch(`http://api.weatherapi.com/v1/current.json?key=57c6b118d30e4dd5aef195955220307&q=${cityInput}&aqi=no`)

    .then(response => response.json())
    .then(data => {
        console.log(data);

        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionsOutput.innerHTML = data.current.condition.text

        const date = data.location.localtime;
        const year = parseInt(date.substr(0, 4));
        const month = parseInt(date.substr(5, 2));
        const day = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)} ${day}, ${month} ${year}`;
        timeOutput.innerHTML = time;

        nameOutput.innerHTML = data.location.name;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
        perceivedTempOutput.innerHTML = data.current.feelslike_c + "&#176;";
        cityNameOutput.innerHTML = data.location.name;
        cityRegionOutput.innerHTML = data.location.region;
        cityCountryOutput.innerHTML = data.location.country;

        let timeOfDay = "day";

        const code = data.current.condition.code;

        if(!data.current.is_day) {
            timeOfDay = "night";
        }

        const iconId = data.current.condition.icon.substr(`//cdn.weatherapi.com/weather/64x64/${timeOfDay}/`.length);

        icon.src = `http://serwer65591.lh.pl/weather.rgora.pl/icons/${timeOfDay}/${iconId}`;

        if(code == 1000) {
            app.style.backgroundImage = `url(http://serwer65591.lh.pl/weather.rgora.pl/images/${timeOfDay}/clear.webp)`;

            btn.style.background = "#5CAAC2";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        }

        else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282 
            ) {
                app.style.backgroundImage = `url(http://serwer65591.lh.pl/weather.rgora.pl/images/${timeOfDay}/cloudy.webp)`;

                btn.style.background = "#22c0f1";
                if(timeOfDay == "night") {
                  btn.style.background = "#181e27";  
                }
            }

        else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252 
                ) {
                    app.style.backgroundImage = `url(http://serwer65591.lh.pl/weather.rgora.pl/images/${timeOfDay}/rainy.webp)`;
    
                    btn.style.background = "#647d75";
                    if(timeOfDay == "night") {
                      btn.style.background = "#325c80";  
                    }
                }
        
        else {
            app.style.backgroundImage = `url(http://serwer65591.lh.pl/weather.rgora.pl/images/${timeOfDay}/snowy.webp)`;
    
            btn.style.background = "#4d72aa";
            if(timeOfDay == "night") {
              btn.style.background = "#1b1b1b";  
            }
        }

        app.style.opacity = "1";
    })

    .catch(() => {
        alert("City not found, please type city name in english version");
        app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";