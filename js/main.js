import { getRecipes } from "./api.js";
import { afficherRecettes } from "./affichage.js";
import {searchRecipes} from "./api.js"
import { validerRecette } from "./validation.js";

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
})


const form = document.getElementById("recipe-form")

form.addEventListener("submit", function(event) {
    event.preventDefault()
    const nom = document.getElementById("recipe-name").value
    const cuisine = document.getElementById("recipe-cuisine").value
    const difficulte = document.getElementById("recipe-difficulty").value;
    const temps = document.getElementById("recipe-time").value
    const erreurs = validerRecette(nom, cuisine, difficulte, temps);

    document.getElementById("name-error").textContent = erreurs.nom || ""
    document.getElementById("cuisine-error").textContent = erreurs.cuisine || ""
    document.getElementById("difficulty-error").textContent = erreurs.difficulte || ""
    document.getElementById("time-error").textContent = erreurs.temps || ""

    if (Object.keys(erreurs).length > 0) {
        return
    }
    console.log("Formulaire valide !")
})
