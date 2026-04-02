import { search } from "./searchBar.js";
import "./styles.css";
import bgImage from "./resources/pexels-jplenio-3131634.jpg";

export default bgImage;

const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
  search();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
