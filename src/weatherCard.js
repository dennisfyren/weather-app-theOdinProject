import { weatherData } from "./weatherAPI.js";
import { Chart } from "chart.js/auto";

const weatherContainer = document.querySelector("#weather-container");
// const weatherItem = document.querySelector("#weather-item");

export const showWeather = (city) => {
  console.log(weatherData);
  removeChildren(weatherContainer);
  const locationDisplay = document.createElement("h3");
  weatherContainer.appendChild(locationDisplay);
  const weatherItem = document.createElement("div");
  weatherContainer.appendChild(weatherItem);
  weatherItem.id = "weather-item";
  locationDisplay.textContent = city.charAt(0).toUpperCase() + city.slice(1);

  weatherData.forEach((item) => {
    const container = document.createElement("div");
    container.classList.add("weather-card");
    const date = document.createElement("p");
    const temp = document.createElement("p");
    const windspeed = document.createElement("p");
    const downfall = document.createElement("p");
    const icon = document.createElement("img");
    import(`./resources/weather-icons/${item.icon}.png`).then((image) => {
      const imgUrl = image.default;
      icon.src = imgUrl;
    });

    function addGraph() {
      let hourlyTemp = [];
      let hourlyWind = [];
      const objInd = weatherData.findIndex((obj) => obj.id === item.id);
      weatherData[objInd].hours.forEach((hour) => {
        hourlyTemp[hourlyTemp.length] = hour.temp;
        const toMs = Math.round((hour.windspeed / 3.6) * 10) / 10;
        hourlyWind[hourlyWind.length] = toMs;
      });
      const elements = document.querySelectorAll(".graph");
      elements.forEach((element) => {
        element.remove();
      });
      const children = document.querySelectorAll(".expanded");
      children.forEach((child) => {
        child.classList.remove("expanded");
      });
      if (container.classList.contains("expanded")) {
        container.classList.remove("expanded");
      } else {
        container.classList.add("expanded");
      }
      container.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      const graph = document.createElement("canvas");
      graph.classList.add("graph");
      new Chart(graph, {
        type: "line",
        data: {
          labels: [
            "03.00",
            "06.00",
            "09.00",
            "12.00",
            "15.00",
            "18.00",
            "21.00",
            "24.00",
          ],
          datasets: [
            {
              label: "Temperature",
              data: [
                hourlyTemp[2],
                hourlyTemp[5],
                hourlyTemp[8],
                hourlyTemp[11],
                hourlyTemp[14],
                hourlyTemp[17],
                hourlyTemp[20],
                hourlyTemp[23],
              ],
              borderwidth: 1,
            },
            {
              label: "Windspeed",
              data: [
                hourlyWind[2],
                hourlyWind[5],
                hourlyWind[8],
                hourlyWind[11],
                hourlyWind[14],
                hourlyWind[17],
                hourlyWind[20],
                hourlyWind[23],
              ],
              borderwidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      container.appendChild(graph);
      hourlyTemp = [];
    }

    container.addEventListener("click", addGraph);

    if (weatherItem.childElementCount === 0) {
      container.classList.add("expanded");
      setTimeout(() => {
        addGraph();
      }, 100);
    }

    date.textContent = item.dateTime;
    temp.textContent = `${item.temp}°C`;
    const toMs = Math.round(item.windspeed / 3.6);
    windspeed.textContent = (toMs * 100) / 100 + "m/s";
    downfall.textContent = `${item.snow}mm`;
    const dateDay = new Date(item.dateTime);
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = document.createElement("p");
    day.textContent = weekdays[dateDay.getDay()];
    container.appendChild(icon);
    container.appendChild(day);
    container.appendChild(date);
    container.appendChild(temp);
    container.appendChild(windspeed);
    container.appendChild(downfall);

    weatherItem.appendChild(container);

    let scroll = document.querySelector("#weather-item");
    scroll.addEventListener("wheel", (e) => {
      e.preventDefault();
      scroll.scrollLeft += e.deltaY / 40;
    });
  });
};

export function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
