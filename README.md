<div align="center">

# 🍃 Axios en Cuisine

**Le carnet de recettes du club cuisine**

Application web de consultation et de recherche de recettes, développée en HTML, Tailwind CSS, JavaScript Vanilla et Axios, alimentée par l'API DummyJSON.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![DummyJSON](https://img.shields.io/badge/API-DummyJSON-000000?style=for-the-badge&logo=json&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Fonctionnalités](#2-fonctionnalités)
3. [Technologies utilisées](#3-technologies-utilisées)
4. [Structure du projet](#4-structure-du-projet)
5. [Installation et lancement](#5-installation-et-lancement)
6. [API utilisée](#6-api-utilisée)
7. [Validation du formulaire](#7-validation-du-formulaire)
8. [Limites du projet](#8-limites-du-projet)
9. [Auteur](#9-auteur)

---

## 1. Présentation du projet

**Axios en Cuisine** est une application web monopage qui permet de découvrir, rechercher et proposer des recettes de cuisine. L'interface s'appuie sur l'API publique **DummyJSON**, qui fournit un jeu de données de recettes réaliste pour les projets de démonstration.

L'application charge une sélection de recettes, les présente sous forme de cartes et permet d'effectuer une recherche par mot-clé. Un formulaire dédié permet de saisir une nouvelle recette et d'en vérifier les champs avant soumission.

**Objectif principal :** mettre en pratique la consommation d'une API REST avec Axios dans une interface JavaScript Vanilla, tout en proposant un carnet de recettes simple, lisible et responsive.

> [!NOTE]
> Ce projet est un projet pédagogique réalisé dans le cadre de **YouCode**. Il se concentre sur la récupération et l'affichage de données distantes ; les opérations d'écriture ne sont pas encore connectées à l'API.

---

## 2. Fonctionnalités

### Affichage des recettes

- Chargement initial de **12 recettes** via l'API DummyJSON.
- Affichage de chaque recette dans une carte comprenant :
  - l'image du plat ;
  - le nom de la recette ;
  - le type de cuisine ;
  - le niveau de difficulté ;
  - le temps de préparation en minutes.
- Mise à jour dynamique du compteur de recettes affichées.
- Interface responsive construite avec les classes utilitaires Tailwind CSS.

### Recherche de recettes

- Recherche par mot-clé à l'aide du bouton **« Rechercher »**.
- Requête envoyée à l'endpoint de recherche de DummyJSON.
- Réinitialisation de la liste complète lorsque le champ de recherche est vide.
- Affichage d'un **état vide** explicite lorsqu'aucune recette ne correspond à la recherche.
- Bouton **« Voir toutes les recettes »** permettant de revenir à la liste initiale.

### Formulaire de proposition de recette

- Formulaire comprenant le nom, le type de cuisine, la difficulté et le temps de préparation.
- Validation des champs côté client avant acceptation du formulaire.
- Affichage d'un message d'erreur sous chaque champ invalide.

> [!IMPORTANT]
> Le formulaire est actuellement **validé localement uniquement** : aucune requête `POST` n'est envoyée et la recette n'est pas ajoutée à l'API. Aucune fonctionnalité de suppression de recette n'est implémentée dans le projet.

### Gestion des états

| État | Statut | Détail |
| --- | --- | --- |
| Liste chargée | ✅ Fonctionnel | Les recettes reçues sont transformées en cartes HTML. |
| Aucun résultat | ✅ Fonctionnel | Le message « Aucune recette trouvée » et le bouton de réinitialisation sont affichés. |
| Chargement | ⚠️ Interface seulement | Le bloc `#loading` existe dans le HTML, mais n'est pas piloté par le JavaScript. |
| Erreur réseau | ⚠️ Interface seulement | Le bloc `#error-state` et le bouton « Réessayer » existent dans le HTML, mais ne sont pas connectés à la logique applicative. |

---

## 3. Technologies utilisées

| Technologie | Rôle dans le projet |
| --- | --- |
| **HTML5** | Structure sémantique de la page : navigation, hero, recettes, formulaire et pied de page. |
| **Tailwind CSS** | Mise en forme et responsive design, chargé via le CDN officiel. |
| **JavaScript Vanilla** | Logique de l'application, manipulation du DOM et gestion des événements, en modules ES. |
| **Axios** | Client HTTP utilisé pour interroger l'API DummyJSON. |
| **DummyJSON API** | Source des données de recettes. |
| **Vite** | Serveur de développement local et outil de build. |
| **Google Fonts** | Polices `DM Sans` et `Playfair Display` utilisées par l'interface. |

Versions principales déclarées dans `package.json` :

```json
{
  "dependencies": {
    "axios": "^1.21.1",
    "vite": "^8.3.8"
  }
}
```

---

## 4. Structure du projet

```text
Axios-en-cuisine/
├── index.html
├── package.json
├── package-lock.json
├── js/
│   ├── main.js
│   ├── api.js
│   ├── affichage.js
│   └── validation.js
└── node_modules/
```

| Fichier / dossier | Rôle |
| --- | --- |
| `index.html` | Page unique de l'application. Contient la structure complète, la configuration Tailwind, les styles complémentaires, les sections de contenu et le formulaire. |
| `js/main.js` | Point d'entrée JavaScript. Charge les recettes au démarrage, gère la recherche, le bouton de réinitialisation et la soumission du formulaire. |
| `js/api.js` | Configure l'instance Axios (`baseURL`, `timeout`) et expose les fonctions `getRecipes` et `searchRecipes`. |
| `js/affichage.js` | Génère les cartes de recettes, met à jour le compteur et gère l'affichage de l'état vide. |
| `js/validation.js` | Contient la fonction `validerRecette`, responsable des règles de validation du formulaire. |
| `package.json` | Déclare les dépendances et les scripts npm (`dev`, `build`, `preview`). |
| `package-lock.json` | Verrouille les versions exactes des dépendances installées. |
| `node_modules/` | Dossier des dépendances installées par npm. |

---

## 5. Installation et lancement

### Prérequis

| Outil | Version requise |
| --- | --- |
| **Node.js** | `^20.19.0` ou `>=22.12.0` (exigence de Vite 8) |
| **npm** | Fourni avec Node.js |
| **Navigateur** | Version récente avec prise en charge des modules ES |

### Installation

Depuis la racine du projet :

```bash
npm install
```

Cette commande installe Axios et Vite à partir de `package.json`.

### Lancement en développement

```bash
npm run dev
```

Vite démarre le serveur local et affiche l'URL d'accès dans le terminal, généralement :

```text
http://localhost:5173
```

Ouvrir cette adresse dans le navigateur. Le serveur Vite est nécessaire pour résoudre les imports de modules ES et le paquet Axios.

### Build et prévisualisation

```bash
npm run build
npm run preview
```

- `npm run build` génère la version de production dans le dossier `dist/`.
- `npm run preview` sert localement cette version de production.

---

## 6. API utilisée

**URL de base :** [`https://dummyjson.com`](https://dummyjson.com)

L'instance Axios est configurée dans `js/api.js` avec un délai d'expiration de 10 secondes :

```js
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000
});
```

### Endpoints réellement utilisés

| Méthode | Endpoint | Paramètres | Utilisation |
| --- | --- | --- | --- |
| `GET` | `/recipes` | `limit: 12` | Charger les 12 premières recettes au démarrage et lors d'une réinitialisation. |
| `GET` | `/recipes/search` | `q: motCle` | Rechercher des recettes correspondant au mot-clé saisi. |

Exemples d'URL complètes :

```text
https://dummyjson.com/recipes?limit=12
https://dummyjson.com/recipes/search?q=chicken
```

### Fonctionnement des requêtes

- **`GET` — lecture :** `getRecipes()` appelle `/recipes` avec une limite de 12 résultats, puis retourne `response.data`. `main.js` transmet ensuite `data.recipes` à la fonction d'affichage. De la même manière, `searchRecipes(motCle)` appelle `/recipes/search` et retourne les résultats correspondants.
- **`POST` — création :** aucune requête `POST` n'est actuellement implémentée. Le formulaire ne transmet pas ses données à DummyJSON.
- **`DELETE` — suppression :** aucune requête `DELETE` n'est actuellement implémentée, et aucune interface de suppression n'est présente dans les cartes de recettes.

> DummyJSON est une API de démonstration : ses endpoints d'écriture simulent les opérations sans stocker les modifications de façon permanente. Ce point est détaillé dans la section [Limites du projet](#8-limites-du-projet).

---

## 7. Validation du formulaire

La validation est centralisée dans **`js/validation.js`**, via la fonction `validerRecette(nom, cuisine, difficulte, temps)`. Elle est appelée par `js/main.js` lors de la soumission du formulaire.

Le formulaire HTML utilise l'attribut `novalidate` : la validation native du navigateur est donc désactivée au profit de la validation JavaScript.

| Champ | Règle appliquée | Message affiché |
| --- | --- | --- |
| **Nom de la recette** | Ne doit pas être vide après suppression des espaces. | « Le nom est obligatoire. » |
| **Type de cuisine** | Ne doit pas être vide après suppression des espaces. | « La cuisine est obligatoire. » |
| **Difficulté** | Une option doit être sélectionnée (`Easy`, `Medium` ou `Hard`). | « Veuillez choisir une difficulté. » |
| **Temps de préparation** | Doit être renseigné, numérique et strictement supérieur à 0. | « Le temps doit être un nombre positif. » |

Les erreurs sont retournées sous forme d'objet, puis affichées dans les paragraphes prévus sous chaque champ :

- `#name-error`
- `#cuisine-error`
- `#difficulty-error`
- `#time-error`

Lorsque tous les champs sont valides, `main.js` affiche uniquement `Formulaire valide !` dans la console du navigateur. Aucun message de succès visible ni aucune requête vers l'API ne sont déclenchés à ce stade.

> [!NOTE]
> Le champ « Temps » possède des attributs HTML `min="1"` et `max="300"`, mais la fonction de validation JavaScript ne contrôle que le caractère numérique et la positivité de la valeur. La limite maximale de 300 minutes n'est donc pas appliquée par le script.

---

## 8. Limites du projet

- **Aucune persistance des écritures :** le formulaire ne réalise qu'une validation locale. Aucune recette n'est créée via l'API, ni affichée après soumission.
- **Suppression non implémentée :** les cartes de recettes ne proposent aucune action de suppression.
- **Opérations simulées par DummyJSON :** même si des requêtes `POST` ou `DELETE` étaient ajoutées ultérieurement, DummyJSON simulerait ces opérations. Les données ne seraient pas conservées durablement sur le serveur et pourraient revenir à leur état initial.
- **Pagination absente :** l'affichage initial est limité aux 12 premières recettes, sans navigation vers les résultats suivants.
- **États de chargement et d'erreur non pilotés :** les blocs correspondants sont présents dans `index.html`, mais aucun code JavaScript ne les affiche ou ne les masque.
- **Recherche déclenchée par bouton :** la recherche ne se lance pas automatiquement pendant la saisie ; il faut cliquer sur « Rechercher ».
- **Dépendance à des ressources externes :** l'application nécessite un accès réseau pour DummyJSON, le CDN Tailwind, Google Fonts et l'image d'illustration Unsplash.

---

## 9. Auteur

**Prénom Nom**

- GitHub : [@votre-pseudo](https://github.com/votre-pseudo)
- LinkedIn : [Votre profil](https://www.linkedin.com/in/votre-profil/)

Projet pédagogique réalisé dans le cadre de la formation **YouCode**.
