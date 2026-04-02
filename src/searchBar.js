import { fetchData } from "./weatherAPI.js";
import { removeChildren } from "./weatherCard.js";
export const search = () => {
  removeChildren(document.querySelector("#weather-container"));
  let location = "";
  const searchBar = document.querySelector("#search-bar");
  location = searchBar.value;
  fetchData(location);
};
