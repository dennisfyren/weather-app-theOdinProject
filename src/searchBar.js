import { fetchData } from "./weatherAPI.js";

export const search = () => {
    let location = "";
    const searchBar = document.querySelector("#search-bar");
    location = searchBar.value;
    fetchData(location);
}

