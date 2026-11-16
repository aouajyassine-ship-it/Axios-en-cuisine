
import axios from "axios";
// Création d'une instance Axios
const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000
});
console.log(api)
// Récupérer les 12 premières recettes
export async function getRecipes() {
    const response = await api.get("/recipes", {
        params: {
            limit: 12
        }
    });

    return response.data;
}
export default api;

