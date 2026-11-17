import { getRecipes } from "./api.js";
import { afficherRecettes } from "./affichage.js";
import {searchRecipes} from "./api.js"

async function chargerRecettes() {
const data = await getRecipes();
afficherRecettes(data.recipes);
}
chargerRecettes();

const searchbar = document.getElementById("search-input")
const buttonsearch = document.getElementById("search-btn")

buttonsearch.addEventListener("click", async function(){
    if (searchbar.value.trim() === "") {
        chargerRecettes();
        return;
    }
    const data = await searchRecipes(searchbar.value);
    afficherRecettes(data.recipes);

})
const showAllBtn = document.getElementById("show-all-btn");

showAllBtn.addEventListener("click", function() {
    chargerRecettes();
});