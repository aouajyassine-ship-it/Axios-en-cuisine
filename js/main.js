import api, { getRecipes, searchRecipes } from "./api.js";
import { afficherRecettes, ajouterRecetteEnPremier } from "./affichage.js";
import { validerRecette } from "./validation.js";

async function chargerRecettes() {
const data = await getRecipes();
afficherRecettes(data.recipes);
}
chargerRecettes();

const searchbar = document.getElementById("search-input")
const buttonsearch = document.getElementById("search-btn")
const submitBtn = document.getElementById("submit-btn");

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
const recipesContainer = document.getElementById("recipes-container");

recipesContainer.addEventListener("click", async function(event) {

    if (event.target.classList.contains("btn-supprimer")) {
        const carte = event.target.closest("[data-id]");
        if (!carte) {
       return;
}
      const id = carte.dataset.id;
        const confirmation = confirm("Voulez-vous vraiment supprimer cette recette ?");
        if (!confirmation) {
            return;
        }

        try {
            await api.delete(`/recipes/${id}`);
            carte.remove();
            if (recipesContainer.children.length === 0) {
            document.getElementById("empty-state").classList.remove("hidden");
            recipesContainer.classList.add("hidden");
}
            const recipeCount = document.getElementById("recipe-count");
            recipeCount.textContent = Number(recipeCount.textContent) - 1;
            const successMessage = document.getElementById("success-message");
            successMessage.textContent = "Recette supprimée avec succès !";
            successMessage.classList.remove("hidden");

        } catch (error) {
            console.log("Erreur :", error);
        }
    }
});

const form = document.getElementById("recipe-form")

form.addEventListener("submit", async function(event) {
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
    submitBtn.disabled = true;

try {
    const response = await api.post("/recipes/add", {
        name: nom,
        cuisine: cuisine,
        difficulty: difficulte,
        prepTimeMinutes: Number(temps)
    });

    ajouterRecetteEnPremier(response.data);
    const successMessage = document.getElementById("success-message");
    successMessage.textContent = "Recette ajoutée avec succès !";
    successMessage.classList.remove("hidden");
} catch (error) {
    console.log("Erreur :", error);

} finally {
    submitBtn.disabled = false;
}
})
