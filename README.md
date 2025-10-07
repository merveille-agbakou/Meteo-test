# 🌤️ WeatherApp - Application Météo

Une application météo moderne et réactive développée avec Vue.js 3, Vue Router et l'API OpenWeather.

## 🚀 Fonctionnalités

- 🔍 Recherche de la météo par ville
- ⭐ Gestion des villes favorites avec persistance locale
- 📱 Interface responsive et moderne
- 📊 Tableau de bord avec statistiques
- 🌡️ Affichage des conditions météo actuelles
- 📱 Compatible mobile et desktop

## 🛠️ Installation

1. Cloner le dépôt :
   ```bash
   git clone [URL_DU_REPO]
   cd weather-app
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Créer un fichier `.env` à la racine du projet et ajouter votre clé API OpenWeather :
   ```
   VITE_OPENWEATHER_API_KEY=votre_cle_api_ici
   ```

4. Lancer l'application en mode développement :
   ```bash
   npm run dev
   ```

5. Pour la production :
   ```bash
   npm run build
   npm run preview
   ```

## 📝 Configuration

L'application utilise les variables d'environnement suivantes :
- `VITE_OPENWEATHER_API_KEY` : Votre clé API OpenWeather (obtenez-la sur [OpenWeather](https://openweathermap.org/api))
- `VITE_OPENWEATHER_BASE_URL` : L'URL de base de l'API OpenWeather (par défaut : https://api.openweathermap.org/data/2.5)

## 🧩 Technologies utilisées

- Vue.js 3 (Composition API)
- Vue Router
- Pinia (Gestion d'état)
- Axios (Requêtes HTTP)
- Chart.js (Visualisation des données)
- Normalize.css (Réinitialisation CSS)
- Vite (Build tool)

## 📄 Licence

Ce projet est sous licence MIT.
