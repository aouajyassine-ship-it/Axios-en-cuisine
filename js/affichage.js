const container = document.getElementById("recipes-container")
const nombrerecipe = document.getElementById("recipe-count")

export function afficherRecettes(recettes){
    nombrerecipe.textContent = recettes.length
    const cartes = recettes.map(function(recette){
return `
    <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <img
            src="${recette.image}"
            alt="${recette.name}"
            class="w-full h-48 object-cover">

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
        </div>
    </div>
`
    })
    container.innerHTML = cartes.join("");

}