// Vérifie les champs du formulaire et retourne un objet d'erreurs
export function validerRecette(nom, cuisine, difficulte, temps) {
    const erreurs = {};

    // Le nom doit contenir entre 3 et 60 caractères
    if (nom.trim().length < 3 || nom.trim().length > 60) {
        erreurs.nom = "Le nom doit contenir entre 3 et 60 caractères.";
    }

    // La cuisine est obligatoire
    if (cuisine.trim() === "") {
        erreurs.cuisine = "La cuisine est obligatoire.";
    }

    // Une difficulté doit être choisie
    if (difficulte === "") {
        erreurs.difficulte = "Veuillez choisir une difficulté.";
    }

    // Le temps doit être un nombre entre 1 et 300 minutes
    if (temps === "" || isNaN(Number(temps)) || Number(temps) < 1 || Number(temps) > 300) {
        erreurs.temps = "Le temps doit être compris entre 1 et 300 minutes.";
    }

    return erreurs;
}
