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
  locationDisplay.textContent = city;

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

    container.addEventListener("click", () => {
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
      new Chart(graph, {
        type: "line",
        data: {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
          ],
          datasets: [
            {
              label: "Hourly Temperature",
              data: [
                weatherData[0].hours,
                weatherData[1].hours,
                weatherData[2].hours,
                weatherData[3].hours,
                weatherData[4].hours,
                weatherData[5].hours,
                weatherData[6].hours,
                weatherData[7].hours,
                weatherData[8].hours,
                weatherData[9].hours,
                weatherData[10].hours,
                weatherData[11].hours,
                weatherData[12].hours,
                weatherData[13].hours,
                weatherData[14].hours,
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
      console.log(graph);
      container.appendChild(graph);
    });

    date.textContent = item.dateTime;
    temp.textContent = `${item.temp}°C`;
    const toMs = Math.round(item.windspeed / 3.6);
    windspeed.textContent = (toMs * 100) / 100 + "m/s";
    downfall.textContent = `${item.snow}mm`;

    container.appendChild(icon);

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
