import { showWeather } from "./weatherCard.js";

export const weatherData = [];
export let city;

export const fetchData = (location) => {
    let city = location;
    if (city === ""){
        city = "stockholm";
    }
    const response = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days,current&key=W7A96ELHMJTFS3QXDT8Y4YBJ5`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response)
            city = response.resolvedAddress;
            console.log(location);
                
            response.days.forEach(element => {
                    weatherData[weatherData.length] = new weatherDay(
                            element.datetime,
                            element.temp,
                            element.windspeed,
                            element.snow,
                            element.conditions,
                            element.icon
                    )
            });      
            showWeather();    
        })
        .catch((e) => {
            console.log(e);
        })
        console.log(weatherData);
}
class weatherDay {
    constructor(dateTime, temp, windspeed, snow, conditions, icon){
        this.dateTime = dateTime;
        this.temp = temp;
        this.windspeed = windspeed;
        this.snow = snow;
        this.conditions = conditions;
        this.icon = icon;
    }
}