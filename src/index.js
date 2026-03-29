import { search } from "./searchbar.js";

const searchButton = document.querySelector("#search")

searchButton.addEventListener("click", () => {
    search();
})
