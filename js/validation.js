export function validerRecette(nom, cuisine, difficulte, temps) {
    const erreurs = {};
    if (nom.trim() === "") {
        erreurs.nom = "Le nom est obligatoire.";
    }
    if (cuisine.trim() === "") {
        erreurs.cuisine = "La cuisine est obligatoire.";
    }
    if (difficulte === "") {
        erreurs.difficulte = "Veuillez choisir une difficulté.";
    }
    if (temps === "" || Number(temps) <= 0 || isNaN(Number(temps))) {
        erreurs.temps = "Le temps doit être un nombre positif.";
    }
    return erreurs;
}
