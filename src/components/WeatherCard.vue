<template>
  <div class="weather-card" :class="{ 'favorite': isFavorite }">
    <div class="weather-header">
      <h3>{{ weatherData.name }}, {{ weatherData.sys.country }}</h3>
      <button @click="toggleFavorite" class="favorite-btn">
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>
    <div class="weather-main">
      <div class="temperature">
        {{ Math.round(weatherData.main.temp) }}°C
      </div>
      <div class="weather-icon">
        <img 
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" 
          :alt="weatherData.weather[0].description"
        >
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </div>
    <div class="weather-details">
      <div class="detail">
        <span>Humidité</span>
        <span>{{ weatherData.main.humidity }}%</span>
      </div>
      <div class="detail">
        <span>Vent</span>
        <span>{{ Math.round(weatherData.wind.speed * 3.6) }} km/h</span>
      </div>
      <div class="detail">
        <span>Pression</span>
        <span>{{ weatherData.main.pressure }} hPa</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    weatherData: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.weatherData);
    }
  }
};
</script>

<style scoped>
.weather-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 1rem 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.weather-card.favorite {
  border: 2px solid #ffd700;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.weather-header h3 {
  margin: 0;
  color: #333;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  padding: 0.25rem 0.5rem;
  line-height: 1;
}

.favorite-btn:hover, .favorite .favorite-btn {
  color: #ffd700;
}

.weather-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
}

.weather-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon img {
  width: 80px;
  height: 80px;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.detail {
  display: flex;
  flex-direction: column;
}

.detail span:first-child {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.detail span:last-child {
  font-weight: 600;
  color: #2c3e50;
}
</style>
