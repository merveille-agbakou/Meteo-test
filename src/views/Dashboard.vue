
<template>
  <div class="dashboard">
    <header class="app-header glass-effect">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
              <path d="M16 16c0-5 4-9 4-9s-4-4-9-4-9 4-9 4 4 9 4 9"></path>
              <path d="M15.7 14c-.8-2-2.2-3-3.7-3-1.5 0-2.9 1-3.7 3"></path>
            </svg>
            <h1>Météo App</h1>
          </div>
          <nav>
            <router-link to="/" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Accueil</span>
            </router-link>
            <button v-if="currentWeather" @click="toggleFavorite(currentWeather)" class="favorite-btn" :class="{ 'is-favorite': isFavorite(currentWeather.id) }">
              <svg v-if="isFavorite(currentWeather.id)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <main class="container">
      <WeatherSearch 
        @search="handleSearch"
        @suggestion-selected="handleSuggestionSelected"
        :loading="loading"
        :error="error"
        @clear-error="error = ''"
      />

      <div v-if="currentWeather" class="weather-container">
        <WeatherCard 
          :weather-data="currentWeather" 
          :is-favorite="isFavorite(currentWeather.id)"
          @toggle-favorite="toggleFavorite"
          class="current-weather"
        />
      </div>

      <div v-if="favorites.length > 0" class="favorites-section">
        <h2>Villes favorites</h2>
        <div class="favorites-grid">
          <WeatherCard 
            v-for="favorite in favorites" 
            :key="favorite.id"
            :weather-data="favorite"
            :is-favorite="true"
            @toggle-favorite="toggleFavorite"
            @click="selectFavorite(favorite)"
            class="favorite-card"
          />
        </div>
      </div>

      <div v-if="searchHistory.length > 0" class="history-section">
        <h2>Historique des recherches</h2>
        <div class="history-list">
          <div 
            v-for="item in searchHistory" 
            :key="item.id" 
            class="history-item"
            @click="fetchWeather(item.name)"
          >
            <span>{{ item.name }} </span>
            <span class="separator"></span>
            <small>{{ formatDate(item.lastSearched) }}</small>
          </div>
        </div>
      </div>

      <WeatherStats 
        v-if="currentWeather"
        :favorites="favorites"
        :search-history="searchHistory"
        :weather-data="[currentWeather, ...favorites]"
      />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import WeatherSearch from '../components/WeatherSearch.vue';
import WeatherStats from '../components/WeatherStats.vue';
import WeatherCard from '../components/WeatherCard.vue';

export default {
  name: 'DashboardView',
  components: {
    WeatherSearch,
    WeatherCard,
    WeatherStats
  },
  setup() {
    const router = useRouter();
    const currentWeather = ref(null);
    const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    const loading = ref(false);
    const error = ref('');
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const UNITS = 'metric';
    const LANG = 'fr';

    // Gestion des favoris
    const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

    const toggleFavorite = (weather) => {
      const index = favorites.value.findIndex(fav => fav.id === weather.id);
      if (index === -1) {
        // Ajouter aux favoris
        favorites.value.push(weather);
      } else {
        // Retirer des favoris
        favorites.value.splice(index, 1);
      }
      // Sauvegarder dans le localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    const isFavorite = (id) => {
      return favorites.value.some(fav => fav.id === id);
    };

    const selectFavorite = (favorite) => {
      currentWeather.value = { ...favorite };
    };

    const handleSearch = async (searchQuery) => {
      if (!searchQuery.trim()) {
        error.value = 'Veuillez entrer un nom de ville';
        return;
      }

      loading.value = true;
      error.value = '';

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchQuery)}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
        );

        if (response.status !== 200) {
          throw new Error('Ville non trouvée');
        }

        const data = response.data;
        currentWeather.value = data;
        addToSearchHistory(data);
      } catch (err) {
        error.value = 'Impossible de récupérer les données météo. Vérifiez le nom de la ville.';
        console.error('Erreur lors de la récupération des données météo:', err);
      } finally {
        loading.value = false;
      }
    };

    const fetchWeather = async (cityName) => {
      return handleSearch(cityName);
    };

    const handleSuggestionSelected = async (suggestion) => {
      try {
        loading.value = true;
        error.value = '';

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${suggestion.coord.lat}&lon=${suggestion.coord.lon}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
        );

        if (response.status !== 200) {
          throw new Error('Ville non trouvée');
        }

        const data = response.data;
        currentWeather.value = data;
        addToSearchHistory(data);
      } catch (err) {
        error.value = 'Impossible de récupérer les données météo pour cette ville.';
        console.error('Erreur lors de la récupération des données météo:', err);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return ' ' + new Date(dateString).toLocaleDateString('fr-FR', options).replace(',', ' à ');
    };

    const addToSearchHistory = (weatherData) => {
      const history = [...searchHistory.value];
      const existingIndex = history.findIndex(item => item.id === weatherData.id);

      if (existingIndex !== -1) {
        history[existingIndex].lastSearched = new Date().toISOString();
      } else {
        history.unshift({
          id: weatherData.id,
          name: weatherData.name.trim(), // Nettoyer le nom pour éviter les espaces indésirables
          country: weatherData.sys.country,
          lastSearched: new Date().toISOString(),
          weather: weatherData.weather[0],
          main: weatherData.main
        });
      }

      const limitedHistory = history.slice(0, 10);
      searchHistory.value = limitedHistory;
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    };

    return {
      currentWeather,
      favorites,
      loading,
      error,
      searchHistory,
      handleSearch,
      toggleFavorite,
      isFavorite,
      selectFavorite,
      handleSuggestionSelected,
      addToSearchHistory,
      formatDate,
      fetchWeather
    };
  }
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 0.75rem 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--primary-color);
}

.logo svg {
  color: var(--primary-light);
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--warning));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 167, 38, 0.1);
  color: var(--primary-color);
}

.nav-link svg {
  transition: transform 0.3s ease;
}

.nav-link:hover svg {
  transform: translateY(-2px);
}

.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 167, 38, 0.1);
  color: #FFB74D;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  background: rgba(255, 167, 38, 0.2);
  transform: scale(1.1);
}

.favorite-btn.is-favorite {
  color: #FFA000;
  background: rgba(255, 160, 0, 0.15);
}

.favorite-btn.is-favorite:hover {
  background: rgba(255, 160, 0, 0.25);
}

@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.25rem;
  }
  
  .nav-link span {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem;
  }
  
  .favorite-btn {
    width: 36px;
    height: 36px;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.weather-container {
  margin-top: 2rem;
}

.favorites-section {
  margin-top: 3rem;
}

.favorites-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.favorite-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.favorite-card:hover {
  transform: translateY(-5px);
}

.history-section {
  margin-top: 3rem;
}

.history-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.history-item:hover {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.history-item span {
  font-weight: 500;
  margin-right: 0.5rem;
}

.history-item .separator {
  color: #666;
  margin: 0 0.5rem;
}

.history-item small {
  color: #888;
  font-size: 0.9rem;
}

.no-favorites {
  text-align: center;
  color: #666;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #4b6cb7;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .favorites-grid {
    grid-template-columns: 1fr;
  }
  
  .app-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .history-item {
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .history-item span {
    margin-right: 0.3rem;
  }
  
  .history-item .separator {
    margin: 0 0.3rem;
  }
  
  .history-item small {
    font-size: 0.8rem;
  }
}
</style>
