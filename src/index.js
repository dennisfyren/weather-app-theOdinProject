import { search } from "./searchbar.js";
import "./styles.css";

const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
  search();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
