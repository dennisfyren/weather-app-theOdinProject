import { weatherData, city } from "./weatherAPI.js";

const weatherContainer = document.querySelector("#weather-container");
const weatherItem = document.querySelector("#weather-item");

export const showWeather = () => {
    const locationDisplay = document.createElement("h3");
    locationDisplay.textContent = city;
    console.log(city);
    weatherItem.appendChild(locationDisplay);

    weatherData.forEach((item) => {
        const date = document.createElement("p");
        const downfall = document.createElement("p");
        const temp = document.createElement("p");
        const conditions = document.createElement("p");
})
}