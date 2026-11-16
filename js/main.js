import { getRecipes } from "./api.js";
import { afficherRecettes } from "./affichage.js";

async function chargerRecettes() {
const data = await getRecipes();
afficherRecettes(data.recipes);
}
chargerRecettes();