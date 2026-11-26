import api, { getRecipes, searchRecipes } from "./api.js";
import {
    afficherRecettes,
    ajouterRecetteEnPremier,
    mettreAJourCompteur,
    mettreAJourEtatVide
} from "./affichage.js";
import { validerRecette } from "./validation.js";

// Éléments de la page
const loading = document.getElementById("loading");
const errorState = document.getElementById("error-state");
const errorMessage = document.getElementById("error-message");
const retryBtn = document.getElementById("retry-btn");
const recipesContainer = document.getElementById("recipes-container");
const emptyState = document.getElementById("empty-state");
const actionMessage = document.getElementById("action-message");
const searchbar = document.getElementById("search-input");
const buttonsearch = document.getElementById("search-btn");
const showAllBtn = document.getElementById("show-all-btn");
const form = document.getElementById("recipe-form");
const submitBtn = document.getElementById("submit-btn");
const successMessage = document.getElementById("success-message");
const formError = document.getElementById("form-error");

// Sert au bouton "Réessayer" pour relancer la dernière recherche
let derniereRecherche = "";

// Affiche le chargement et cache les autres états
function afficherChargement() {
    loading.classList.remove("hidden");
    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    recipesContainer.classList.add("hidden");

    // On vide l'ancienne liste pour éviter d'afficher d'anciennes cartes
    recipesContainer.innerHTML = "";
    mettreAJourCompteur();
    cacherMessageAction();
}

// Cache le chargement
function cacherChargement() {
    loading.classList.add("hidden");
}

// Affiche une erreur de chargement dans la section des recettes
function afficherErreur(message) {
    errorMessage.textContent = message;
    errorState.classList.remove("hidden");
    loading.classList.add("hidden");
    emptyState.classList.add("hidden");
    recipesContainer.classList.add("hidden");

    // Aucune carte n'est visible : le compteur doit donc être à 0
    recipesContainer.innerHTML = "";
    mettreAJourCompteur();
}

// Affiche un message après une suppression
function afficherMessageAction(message, estUneErreur) {
    actionMessage.textContent = message;
    actionMessage.classList.remove("hidden", "bg-green-50", "text-green-700", "bg-red-50", "text-red-700");

    if (estUneErreur) {
        actionMessage.classList.add("bg-red-50", "text-red-700");
    } else {
        actionMessage.classList.add("bg-green-50", "text-green-700");
    }
}

// Cache le message de suppression
function cacherMessageAction() {
    actionMessage.textContent = "";
    actionMessage.classList.add("hidden");
}

// Charge les 12 premières recettes
async function chargerRecettes() {
    derniereRecherche = "";
    afficherChargement();

    try {
        const data = await getRecipes();
        afficherRecettes(data.recipes || []);
    } catch (error) {
        afficherErreur("Impossible de charger les recettes. Vérifiez votre connexion puis réessayez.");
    } finally {
        cacherChargement();
    }
}

// Recherche les recettes avec le mot-clé saisi
async function rechercherRecettes() {
    const motCle = searchbar.value.trim();

    if (motCle === "") {
        await chargerRecettes();
        return;
    }

    derniereRecherche = motCle;
    afficherChargement();

    try {
        const data = await searchRecipes(motCle);
        afficherRecettes(data.recipes || []);
    } catch (error) {
        afficherErreur("Impossible de rechercher les recettes. Vérifiez votre connexion puis réessayez.");
    } finally {
        cacherChargement();
    }
}

// Bouton "Rechercher"
buttonsearch.addEventListener("click", async function () {
    await rechercherRecettes();
});

// Bouton "Voir toutes les recettes"
showAllBtn.addEventListener("click", function () {
    searchbar.value = "";
    chargerRecettes();
});

// Bouton "Réessayer"
retryBtn.addEventListener("click", function () {
    if (derniereRecherche !== "") {
        rechercherRecettes();
    } else {
        chargerRecettes();
    }
});

// Suppression d'une recette
recipesContainer.addEventListener("click", async function (event) {
    const bouton = event.target.closest(".btn-supprimer");

    if (!bouton) {
        return;
    }

    const carte = bouton.closest("[data-id]");

    if (!carte) {
        return;
    }

    const id = carte.dataset.id;
    const estLocale = carte.dataset.local === "true";

    // La confirmation doit apparaître avant d'envoyer la requête
    const confirmation = confirm("Voulez-vous vraiment supprimer cette recette ?");

    if (!confirmation) {
        return;
    }

    bouton.disabled = true;
    bouton.textContent = "Suppression...";

    try {
        // Le DELETE utilise l'id de la recette dans l'URL
        await api.delete(`/recipes/${id}`);

        // On retire la carte seulement après une suppression réussie
        carte.remove();
        mettreAJourCompteur();
        mettreAJourEtatVide();
        afficherMessageAction("Recette supprimée avec succès !", false);
    } catch (error) {
        // DummyJSON ne conserve pas les recettes ajoutées avec POST.
        // Un DELETE sur une recette locale peut donc renvoyer une erreur 404.
        if (estLocale && error.response && error.response.status === 404) {
            carte.remove();
            mettreAJourCompteur();
            mettreAJourEtatVide();
            afficherMessageAction("Recette supprimée localement (DummyJSON ne conserve pas les ajouts).", false);
        } else {
            bouton.disabled = false;
            bouton.textContent = "Supprimer";
            afficherMessageAction("Impossible de supprimer cette recette. Veuillez réessayer.", true);
        }
    }
});

// Ajout d'une recette avec le formulaire
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nom = document.getElementById("recipe-name").value.trim();
    const cuisine = document.getElementById("recipe-cuisine").value.trim();
    const difficulte = document.getElementById("recipe-difficulty").value;
    const temps = document.getElementById("recipe-time").value;

    const erreurs = validerRecette(nom, cuisine, difficulte, temps);

    document.getElementById("name-error").textContent = erreurs.nom || "";
    document.getElementById("cuisine-error").textContent = erreurs.cuisine || "";
    document.getElementById("difficulty-error").textContent = erreurs.difficulte || "";
    document.getElementById("time-error").textContent = erreurs.temps || "";

    // On cache les anciens messages avant un nouvel essai
    successMessage.classList.add("hidden");
    formError.classList.add("hidden");

    // Si le formulaire contient une erreur, on bloque l'envoi POST
    if (Object.keys(erreurs).length > 0) {
        return;
    }

    submitBtn.disabled = true;

    try {
        const response = await api.post("/recipes/add", {
            name: nom,
            cuisine: cuisine,
            difficulty: difficulte,
            prepTimeMinutes: Number(temps)
        });

        const nouvelleRecette = response.data;

        // Si l'API ne renvoie pas d'id, on en crée un pour la suppression locale
        if (!nouvelleRecette.id) {
            nouvelleRecette.id = "local-" + Date.now();
        }

        // true signifie que la recette a été ajoutée localement
        ajouterRecetteEnPremier(nouvelleRecette, true);

        // On cache une éventuelle erreur de chargement restée affichée
        errorState.classList.add("hidden");

        successMessage.textContent = "Recette ajoutée avec succès !";
        successMessage.classList.remove("hidden");
    } catch (error) {
        formError.textContent = "Impossible d'ajouter la recette. Vérifiez votre connexion puis réessayez.";
        formError.classList.remove("hidden");
    } finally {
        submitBtn.disabled = false;
    }
});

// Chargement des recettes au démarrage
chargerRecettes();
