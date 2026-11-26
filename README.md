<div align="center">

# 🍃 Axios en Cuisine

**Le carnet de recettes du club cuisine**

Application web de consultation, de recherche, d'ajout et de suppression de recettes, développée en HTML, Tailwind CSS, JavaScript Vanilla et Axios, alimentée par l'API DummyJSON.

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
8. [Gestion des états](#8-gestion-des-états)
9. [Limites du projet](#9-limites-du-projet)
10. [Auteur](#10-auteur)

---

## 1. Présentation du projet

**Axios en Cuisine** est une application web monopage qui permet de découvrir, rechercher, proposer et supprimer des recettes de cuisine. L'interface s'appuie sur l'API publique **DummyJSON**, qui fournit un jeu de données de recettes réaliste pour les projets de démonstration.

L'application charge une sélection de recettes, les présente sous forme de cartes et permet d'effectuer une recherche par mot-clé. Un formulaire dédié permet de saisir une nouvelle recette, de vérifier ses champs puis de l'envoyer à l'API. Chaque carte possède enfin un bouton de suppression avec confirmation.

**Objectif principal :** mettre en pratique la consommation d'une API REST avec Axios dans une interface JavaScript Vanilla, tout en proposant un carnet de recettes simple, lisible et responsive.

> [!NOTE]
> Ce projet est un projet pédagogique réalisé dans le cadre de **YouCode**. DummyJSON est une API de démonstration : les opérations d'écriture (`POST`, `DELETE`) sont simulées et ne sont pas conservées durablement côté serveur.

---

## 2. Fonctionnalités

### Affichage des recettes

- Chargement initial de **12 recettes** via `GET /recipes`.
- Affichage de chaque recette dans une carte comprenant :
  - l'image du plat (si elle existe) ;
  - le nom de la recette ;
  - le type de cuisine ;
  - le niveau de difficulté ;
  - le temps de préparation en minutes.
- Mise à jour dynamique du compteur de recettes affichées.
- Affichage d'un état de **chargement** pendant les requêtes.
- Affichage d'un état d'**erreur** avec un bouton **« Réessayer »** si une requête échoue.
- Interface responsive construite avec les classes utilitaires Tailwind CSS.

### Recherche de recettes

- Recherche par mot-clé à l'aide du bouton **« Rechercher »**.
- Requête envoyée à l'endpoint `GET /recipes/search` avec le paramètre `q`.
- Réinitialisation de la liste complète lorsque le champ de recherche est vide.
- Affichage d'un **état vide** explicite lorsqu'aucune recette ne correspond à la recherche.
- Bouton **« Voir toutes les recettes »** permettant de revenir à la liste initiale.
- Gestion des erreurs de recherche avec un message visible et le bouton **« Réessayer »**.

### Formulaire de proposition de recette

- Formulaire comprenant le nom, le type de cuisine, la difficulté et le temps de préparation.
- Validation des champs côté client avant l'envoi :
  - nom entre 3 et 60 caractères ;
  - cuisine obligatoire ;
  - difficulté obligatoire ;
  - temps entre 1 et 300 minutes.
- Affichage d'un message d'erreur sous chaque champ invalide.
- Blocage de la requête `POST` si le formulaire contient une erreur.
- Envoi de la recette avec `POST /recipes/add`.
- Bouton désactivé pendant l'envoi pour éviter les doubles clics.
- Affichage d'un message de succès ou d'erreur dans l'interface.
- Ajout de la nouvelle recette en première position dans la liste.

### Suppression de recette

- Bouton **« Supprimer »** présent sur chaque carte.
- Demande de confirmation **avant** l'envoi de la requête.
- Aucune requête n'est envoyée si l'utilisateur annule la confirmation.
- Requête `DELETE /recipes/{id}` utilisant l'id de la recette.
- La carte n'est retirée qu'après une suppression réussie, ou après un `404` local pour une recette ajoutée via `POST`.
- Gestion locale des recettes ajoutées avec `POST` : DummyJSON ne les conserve pas et peut renvoyer une erreur `404`. Dans ce cas, la carte est tout de même retirée puisque l'ajout était local.
- Affichage d'un message clair en cas de succès ou d'échec.
- Mise à jour du compteur et de l'état vide après chaque suppression.

### Sécurité

- Les données reçues de l'API sont échappées avant d'être insérées dans le HTML.
- Cela limite les risques d'injection HTML (XSS) via `innerHTML` et `insertAdjacentHTML`.

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
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── js/
│   ├── main.js
│   ├── api.js
│   ├── affichage.js
│   └── validation.js
└── README.md
```

| Fichier / dossier | Rôle |
| --- | --- |
| `index.html` | Page unique de l'application. Contient la structure complète, la configuration Tailwind, les styles complémentaires, les sections de contenu et le formulaire. |
| `js/main.js` | Point d'entrée JavaScript. Charge les recettes, gère la recherche, les états de chargement et d'erreur, l'ajout et la suppression. |
| `js/api.js` | Configure l'instance Axios (`baseURL`, `timeout`) et expose les fonctions `getRecipes` et `searchRecipes`. |
| `js/affichage.js` | Génère les cartes de recettes, échappe les données, met à jour le compteur et gère l'état vide. |
| `js/validation.js` | Contient la fonction `validerRecette`, responsable des règles de validation du formulaire. |
| `vite.config.js` | Configuration de Vite, notamment le chemin de base pour GitHub Pages. |
| `.github/workflows/deploy.yml` | Workflow de build et de déploiement sur GitHub Pages. |
| `.gitignore` | Liste les fichiers et dossiers qui ne doivent pas être suivis par Git (`node_modules`, `dist`, etc.). |
| `package.json` | Déclare les dépendances et les scripts npm (`dev`, `build`, `preview`). |
| `package-lock.json` | Verrouille les versions exactes des dépendances installées. |

> [!NOTE]
> Le dossier `node_modules/` est nécessaire au fonctionnement local mais il est ignoré par Git. Il est recréé avec `npm install`.

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

| Méthode | Endpoint | Paramètres / corps | Utilisation |
| --- | --- | --- | --- |
| `GET` | `/recipes` | `limit: 12` | Charger les 12 premières recettes au démarrage et lors d'une réinitialisation. |
| `GET` | `/recipes/search` | `q: motCle` | Rechercher des recettes correspondant au mot-clé saisi. |
| `POST` | `/recipes/add` | `name`, `cuisine`, `difficulty`, `prepTimeMinutes` | Ajouter une nouvelle recette. |
| `DELETE` | `/recipes/{id}` | id de la recette dans l'URL | Supprimer une recette. |

Exemples d'URL complètes :

```text
https://dummyjson.com/recipes?limit=12
https://dummyjson.com/recipes/search?q=chicken
https://dummyjson.com/recipes/add
https://dummyjson.com/recipes/1
```

### Fonctionnement des requêtes

- **`GET` — lecture :** `getRecipes()` appelle `/recipes` avec une limite de 12 résultats, puis retourne `response.data`. `main.js` transmet ensuite `data.recipes` à la fonction d'affichage. De la même manière, `searchRecipes(motCle)` appelle `/recipes/search` et retourne les résultats correspondants.
- **`POST` — création :** `main.js` envoie un objet JSON avec `name`, `cuisine`, `difficulty` et `prepTimeMinutes`. La carte est ajoutée en première position avec la réponse du serveur.
- **`DELETE` — suppression :** `main.js` envoie `DELETE /recipes/{id}` avec l'id contenu dans la carte. La carte n'est retirée qu'après une réponse réussie.

> DummyJSON est une API de démonstration : ses endpoints d'écriture simulent les opérations sans stocker les modifications de façon permanente. Ce point est détaillé dans la section [Limites du projet](#9-limites-du-projet).

---

## 7. Validation du formulaire

La validation est centralisée dans **`js/validation.js`**, via la fonction `validerRecette(nom, cuisine, difficulte, temps)`. Elle est appelée par `js/main.js` lors de la soumission du formulaire.

Le formulaire HTML utilise l'attribut `novalidate` : la validation native du navigateur est donc désactivée au profit de la validation JavaScript.

| Champ | Règle appliquée | Message affiché |
| --- | --- | --- |
| **Nom de la recette** | Doit contenir entre 3 et 60 caractères après suppression des espaces. | « Le nom doit contenir entre 3 et 60 caractères. » |
| **Type de cuisine** | Ne doit pas être vide après suppression des espaces. | « La cuisine est obligatoire. » |
| **Difficulté** | Une option doit être sélectionnée (`Easy`, `Medium` ou `Hard`). | « Veuillez choisir une difficulté. » |
| **Temps de préparation** | Doit être renseigné, numérique et compris entre 1 et 300 minutes. | « Le temps doit être compris entre 1 et 300 minutes. » |

Les erreurs sont retournées sous forme d'objet, puis affichées dans les paragraphes prévus sous chaque champ :

- `#name-error`
- `#cuisine-error`
- `#difficulty-error`
- `#time-error`

Tant qu'une erreur existe, la requête `POST` n'est pas envoyée. Lorsque tous les champs sont valides, la recette est envoyée à l'API et un message de succès apparaît.

---

## 8. Gestion des états

| État | Élément | Comportement |
| --- | --- | --- |
| Chargement | `#loading` | Affiché pendant les requêtes `GET` et la recherche, puis masqué à la fin. |
| Erreur | `#error-state` / `#error-message` | Affiché si une requête `GET` ou de recherche échoue. Le bouton `#retry-btn` relance la dernière action de chargement ou de recherche. |
| Aucun résultat | `#empty-state` | Affiché quand la liste ou la recherche ne contient aucune recette. |
| Message de suppression | `#action-message` | Affiche le succès ou l'échec d'une suppression. |
| Message du formulaire | `#success-message` / `#form-error` | Affiche le succès ou l'échec de l'ajout d'une recette. |

Le compteur `#recipe-count` est recalculé à partir des cartes réellement présentes dans le DOM. Il reste donc cohérent après un chargement, une recherche, un ajout ou une suppression.

---

## 9. Limites du projet

- **Persistance simulée :** DummyJSON ne conserve pas réellement les recettes ajoutées ou supprimées. Après un rechargement de la page, les données reviennent à leur état initial.
- **Suppression des recettes ajoutées :** DummyJSON peut renvoyer `404` lors du `DELETE` d'une recette créée avec `POST`. L'application considère alors la suppression comme locale et retire la carte.
- **Pagination absente :** l'affichage initial est limité aux 12 premières recettes, sans navigation vers les résultats suivants.
- **Recherche déclenchée par bouton :** la recherche ne se lance pas automatiquement pendant la saisie ; il faut cliquer sur « Rechercher ».
- **Dépendance à des ressources externes :** l'application nécessite un accès réseau pour DummyJSON, le CDN Tailwind, Google Fonts et l'image d'illustration Unsplash.

---

## 10. Auteur

**Prénom Nom**

- GitHub : [@aouajyassine-ship-it](https://github.com/aouajyassine-ship-it)
- LinkedIn : [yassine-aouaj](https://www.linkedin.com/in/yassine-aouaj-74330b372//)

Projet pédagogique réalisé dans le cadre de la formation **YouCode**.
