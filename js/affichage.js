// Éléments de la page utilisés pour afficher les recettes
const container = document.getElementById("recipes-container");
const nombrerecipe = document.getElementById("recipe-count");
const emptystate = document.getElementById("empty-state");

// Échappe les caractères spéciaux pour éviter les injections HTML (XSS)
function echapperHtml(valeur) {
    if (valeur === null || valeur === undefined) {
        return "";
    }

    return String(valeur)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Crée le HTML d'une carte de recette
function creerCarte(recette, estLocale) {
    const id = echapperHtml(recette.id);
    const nom = echapperHtml(recette.name);
    const cuisine = echapperHtml(recette.cuisine);
    const difficulte = echapperHtml(recette.difficulty);
    const temps = echapperHtml(recette.prepTimeMinutes);
    const image = echapperHtml(recette.image);

    // Une recette ajoutée avec POST est marquée comme locale.
    // Cela permet de gérer le 404 de DummyJSON lors de sa suppression.
    let attributLocal = "";
    if (estLocale === true) {
        attributLocal = ' data-local="true"';
    }

    // On affiche l'image seulement si elle existe
    let blocImage = "";
    if (recette.image) {
        blocImage = `
            <img
                src="${image}"
                alt="${nom}"
                class="w-full h-48 object-cover">
        `;
    }

    return `
        <div data-id="${id}"${attributLocal} class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            ${blocImage}

            <div class="p-5">
                <h3 class="text-xl font-bold text-[#252D26] mb-3">
                    ${nom}
                </h3>
                <p class="text-sm text-[#858C82] mb-2">
                    Cuisine : ${cuisine}
                </p>
                <p class="text-sm text-[#858C82] mb-2">
                    Difficulté : ${difficulte}
                </p>
                <p class="text-sm text-[#858C82]">
                    ⏱ Préparation : ${temps} minutes
                </p>
                <button type="button" class="btn-supprimer bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
                    Supprimer
                </button>
            </div>
        </div>
    `;
}

// Met à jour le compteur avec le nombre réel de cartes affichées
export function mettreAJourCompteur() {
    const nombreCartes = container.querySelectorAll("[data-id]").length;
    nombrerecipe.textContent = nombreCartes;
}

// Affiche ou masque l'état vide selon le nombre de cartes
export function mettreAJourEtatVide() {
    const nombreCartes = container.querySelectorAll("[data-id]").length;

    if (nombreCartes === 0) {
        emptystate.classList.remove("hidden");
        container.classList.add("hidden");
    } else {
        emptystate.classList.add("hidden");
        container.classList.remove("hidden");
    }
}

// Affiche une liste de recettes reçue depuis l'API
export function afficherRecettes(recettes) {
    if (!recettes || recettes.length === 0) {
        // On vide le conteneur pour ne pas garder d'anciennes cartes
        container.innerHTML = "";
        mettreAJourCompteur();
        mettreAJourEtatVide();
        return;
    }

    const cartes = recettes.map(function (recette) {
        return creerCarte(recette, false);
    });

    container.innerHTML = cartes.join("");
    mettreAJourCompteur();
    mettreAJourEtatVide();
}

// Ajoute une recette en première position après un POST réussi
export function ajouterRecetteEnPremier(recette, estLocale) {
    const carte = creerCarte(recette, estLocale);

    container.insertAdjacentHTML("afterbegin", carte);
    mettreAJourCompteur();
    mettreAJourEtatVide();
}
