
const container = document.getElementById("recipes-container");
const nombrerecipe = document.getElementById("recipe-count");
const emptystate = document.getElementById("empty-state");

function creerCarte(recette) {
    return `
           <div data-id="${recette.id}" class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            ${recette.image ? `
                <img
                    src="${recette.image}"
                    alt="${recette.name}"
                    class="w-full h-48 object-cover">
            ` : ""}

            <div class="p-5">
                <h3 class="text-xl font-bold text-[#252D26] mb-3">
                    ${recette.name}
                </h3>
                <p class="text-sm text-[#858C82] mb-2">
                    Cuisine : ${recette.cuisine}
                </p>
                <p class="text-sm text-[#858C82] mb-2">
                    Difficulté : ${recette.difficulty}
                </p>
                <p class="text-sm text-[#858C82]">
                    ⏱ Préparation : ${recette.prepTimeMinutes} minutes
                </p>
                <button class="btn-supprimer bg-red-500 text-white px-4 py-2 rounded-lg mt-4">Supprimer</button>
            </div>
        </div>
    `;
}

export function afficherRecettes(recettes) {
    nombrerecipe.textContent = recettes.length;
    if (recettes.length === 0) {
        emptystate.classList.remove("hidden");
        container.classList.add("hidden");
        return;
    }
    emptystate.classList.add("hidden");
    container.classList.remove("hidden");

    const cartes = recettes.map(function(recette) {
        return creerCarte(recette);
    });
    container.innerHTML = cartes.join("");
}

export function ajouterRecetteEnPremier(recette) {
    const carte = creerCarte(recette);

    container.insertAdjacentHTML("afterbegin", carte);

    nombrerecipe.textContent = Number(nombrerecipe.textContent) + 1;

    emptystate.classList.add("hidden");
    container.classList.remove("hidden");
}
