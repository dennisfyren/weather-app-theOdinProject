import { showWeather, removeChildren } from "./weatherCard.js";

export let weatherData = [];
export let city;

export const fetchData = (location) => {
  let city = location;
  if (city === "") {
    city = "Stockholm";
  }
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days,current,hours&key=W7A96ELHMJTFS3QXDT8Y4YBJ5`,
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      city = data.resolvedAddress;
      weatherData = [];
      data.days.forEach((element) => {
        weatherData[weatherData.length] = new weatherDay(
          element.datetime,
          element.temp,
          element.windspeed,
          element.snow,
          element.conditions,
          element.icon,
          element.hours,
        );
      });
      showWeather(city);
    })
    .catch((e) => {
      console.log(e);
      showError();
    });
};

class weatherDay {
  constructor(dateTime, temp, windspeed, snow, conditions, icon, hours) {
    this.dateTime = dateTime;
    this.temp = temp;
    this.windspeed = windspeed;
    this.snow = snow;
    this.conditions = conditions;
    this.icon = icon;
    this.hours = hours;
  }
}
function showError() {
  const searchvalue = document.querySelector("#search-bar").value;
  const weatherContainer = document.querySelector("#weather-container");
  removeChildren(weatherContainer);
  const error = document.createElement("div");
  error.classList.add("error");
  error.textContent = `Could not find ${searchvalue}, please try again.`;
  weatherContainer.appendChild(error);
}
