<template>
  <div class="weather-search">
    <form @submit.prevent="searchWeather" class="search-form">
      <div class="search-input-container">
        <input
          ref="searchInput"
          type="text"
          v-model="city"
          @input="onInput"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter.prevent="onEnter"
          @blur="onBlur"
          @focus="onFocus"
          placeholder="Entrez une ville..."
          required
          autocomplete="off"
        />
        <button type="submit" :disabled="loading">
          <span v-if="!loading">Rechercher</span>
          <span v-else class="loading">Recherche...</span>
        </button>
        
        <div v-if="showSuggestions && suggestions.length > 0" class="suggestions">
          <div
            v-for="(suggestion, index) in suggestions"
            :key="suggestion.id"
            @mousedown="selectSuggestion(suggestion)"
            :class="['suggestion-item', { 'is-active': index === activeSuggestionIndex }]"
          >
            {{ suggestion.name }}, {{ suggestion.country }}
            <span class="suggestion-region" v-if="suggestion.state">, {{ suggestion.state }}</span>
          </div>
        </div>
      </div>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default {
  name: 'WeatherSearch',
  data() {
    return {
      city: '',
      error: '',
      suggestions: [],
      activeSuggestionIndex: -1,
      showSuggestions: false,
      loading: false,
      debounce: null
    };
  },
  methods: {
    async searchWeather() {
      this.error = '';
      const searchQuery = this.city.trim();
      if (!searchQuery) return;
      
      try {
        this.loading = true;
        this.$emit('search', searchQuery);
        this.suggestions = [];
        this.showSuggestions = false;
        this.city = '';
      } catch (err) {
        this.error = 'Erreur lors de la recherche. Veuillez réessayer.';
        console.error('Search error:', err);
      } finally {
        this.loading = false;
      }
    },
    
    async onInput() {
      clearTimeout(this.debounce);
      const searchQuery = this.city.trim();
      
      if (searchQuery.length < 2) {
        this.suggestions = [];
        this.showSuggestions = false;
        return;
      }
      
      this.debounce = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`
          );
          
          if (!response.ok) throw new Error('Erreur lors de la récupération des suggestions');
          
          const data = await response.json();
          this.suggestions = data.map(item => ({
            id: `${item.lat}-${item.lon}`,
            name: item.name,
            country: item.country,
            state: item.state,
            lat: item.lat,
            lon: item.lon
          }));
          
          this.activeSuggestionIndex = -1;
          this.showSuggestions = this.suggestions.length > 0;
          
        } catch (err) {
          console.error('Erreur de suggestions:', err);
          this.suggestions = [];
        }
      }, 300);
    },
    
    selectSuggestion(suggestion) {
      this.city = `${suggestion.name}, ${suggestion.country}`;
      this.$emit('suggestion-selected', {
        name: suggestion.name,
        country: suggestion.country,
        coord: {
          lat: suggestion.lat,
          lon: suggestion.lon
        }
      });
      this.showSuggestions = false;
      this.suggestions = [];
      this.$refs.searchInput.focus();
    },
    
    onArrowDown() {
      if (this.activeSuggestionIndex < this.suggestions.length - 1) {
        this.activeSuggestionIndex++;
        this.scrollToActiveSuggestion();
      }
    },
    
    onArrowUp() {
      if (this.activeSuggestionIndex > 0) {
        this.activeSuggestionIndex--;
        this.scrollToActiveSuggestion();
      }
    },
    
    onEnter() {
      if (this.activeSuggestionIndex >= 0 && this.suggestions[this.activeSuggestionIndex]) {
        this.selectSuggestion(this.suggestions[this.activeSuggestionIndex]);
      } else {
        this.searchWeather();
      }
    },
    
    onBlur() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },
    
    onFocus() {
      if (this.suggestions.length > 0) {
        this.showSuggestions = true;
      }
    },
    
    scrollToActiveSuggestion() {
      const container = this.$el.querySelector('.suggestions');
      const activeItem = this.$el.querySelector('.suggestion-item.is-active');
      
      if (activeItem && container) {
        container.scrollTop = activeItem.offsetTop - container.offsetTop;
      }
    }
  },
  
  watch: {
    city(newVal) {
      if (!newVal.trim()) {
        this.suggestions = [];
        this.showSuggestions = false;
      }
    }
  }
};
</script>

<style scoped>
.weather-search {
  margin: 2rem 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
  position: relative;
}

.search-form {
  position: relative;
  width: 100%;
}

.search-input-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

input[type="text"]:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.2);
}

button[type="submit"] {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

button[type="submit"]:hover {
  background-color: var(--primary-light);
}

button[type="submit"]:active {
  transform: translateY(-50%) scale(0.98);
}

button[type="submit"]:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: translateY(-50%);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
  padding: 0.5rem 0;
}

.suggestion-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;
  display: flex;
  flex-direction: column;
}

.suggestion-item:hover,
.suggestion-item.is-active {
  background-color: #f5f5f5;
}

.suggestion-region {
  font-size: 0.85em;
  color: #666;
  margin-top: 0.25rem;
}

.loading {
  display: inline-flex;
  align-items: center;
}

.loading:after {
  content: "";
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.9em;
  text-align: center;
}

form {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0 1.5rem;
  background-color: #4b6cb7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3a5a9a;
}

.error {
  color: #e74c3c;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
