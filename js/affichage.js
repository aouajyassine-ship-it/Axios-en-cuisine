const container = document.getElementById("recipes-container")

function afficherRecettes(recettes){
    const cartes = recettes.map(function(recette){
        return `<p>${recette.name}</p>
                 <img src="${recette.image}" alt="${recette.name}">
                 <p>${recette.cuisine}</p>
                 <p>${recette.difficulty}</p>
                 <p>${recette.prepTimeMinutes}</p>
                  `
    })
    container.innerHTML = cartes.join("");

}