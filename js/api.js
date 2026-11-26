import axios from "axios";

// Création d'une seule instance Axios pour tout le projet
const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000
});

// Récupérer les 12 premières recettes
export async function getRecipes() {
    const response = await api.get("/recipes", {
        params: {
            limit: 12
        }
    });

    return response.data;
}

// Rechercher des recettes avec un mot-clé
export async function searchRecipes(motCle) {
    const response = await api.get("/recipes/search", {
        params: {
            q: motCle
        }
    });

    return response.data;
}

export default api;
