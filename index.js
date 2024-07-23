const inputBox = document.querySelector('.input-box');
const button = document.getElementById('searchButton');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = '1032ce81c2279d3978d94768a6dd35b6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());
    

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display ="none";
        console.log("error");
        return;
    }
    
    weather_body.style.display ="flex";
    location_not_found.style.display = "none";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0] .description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;

    switch (weather_data.weather[0].main){
        case 'Clear':
            weather_img.src = "sunny.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Clouds':
            weather_img.src = "cloudy.png";
            break;
        
    }
    console.log(weather_data);

}

button.addEventListener('click', ()=>{
    checkWeather(inputBox.value);    
});