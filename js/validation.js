
export function validerRecette(nom, cuisine, difficulte, temps) {
    const erreurs = {};
    if (nom.trim().length < 3 || nom.trim().length > 60) {
        erreurs.nom = "Le nom doit contenir entre 3 et 60 caractères.";
    }
    if (cuisine.trim() === "") {
        erreurs.cuisine = "La cuisine est obligatoire.";
    }
    if (difficulte === "") {
        erreurs.difficulte = "Veuillez choisir une difficulté.";
    }
    if (temps === "" || isNaN(Number(temps)) || Number(temps) < 1 || Number(temps) > 300) {
        erreurs.temps = "Le temps doit être compris entre 1 et 300 minutes.";
    }
    return erreurs;
}
