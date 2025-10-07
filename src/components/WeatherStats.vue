<template>
  <div class="weather-stats">
    <h2>📊 Statistiques</h2>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ favoritesCount }}</div>
        <div class="stat-label">Villes favorites</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{{ recentSearchesCount }}</div>
        <div class="stat-label">Recherches récentes</div>
      </div>
      
      <div class="stat-card" v-if="mostCommonCondition">
        <div class="stat-value">
          <img :src="getWeatherIcon(mostCommonCondition.icon)" :alt="mostCommonCondition.main" class="weather-icon">
        </div>
        <div class="stat-label">{{ formatCondition(mostCommonCondition.main) }}</div>
      </div>
    </div>
    
    <div class="chart-container" v-if="temperatureData.labels.length > 0">
      <h3>Températures moyennes</h3>
      <Bar :data="temperatureData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'WeatherStats',
  components: { Bar },
  props: {
    favorites: {
      type: Array,
      default: () => []
    },
    searchHistory: {
      type: Array,
      default: () => []
    },
    weatherData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw}°C`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => `${value}°C`
            }
          }
        }
      }
    };
  },
  computed: {
    favoritesCount() {
      return this.favorites.length;
    },
    recentSearchesCount() {
      return this.searchHistory.length;
    },
    mostCommonCondition() {
      if (!this.weatherData.length) return null;
      
      const conditions = this.weatherData.map(w => ({
        main: w.weather[0]?.main,
        description: w.weather[0]?.description,
        icon: w.weather[0]?.icon
      }));
      
      const counts = conditions.reduce((acc, curr) => {
        const key = curr.main;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      
      return conditions.find(c => c.main === mostCommon[0]);
    },
    temperatureData() {
      const lastFive = [...this.weatherData].reverse().slice(0, 5);
      
      return {
        labels: lastFive.map(w => w.name),
        datasets: [
          {
            label: 'Température',
            backgroundColor: 'rgba(75, 108, 183, 0.7)',
            borderColor: 'rgba(75, 108, 183, 1)',
            borderWidth: 1,
            data: lastFive.map(w => Math.round(w.main.temp))
          }
        ]
      };
    }
  },
  methods: {
    getWeatherIcon(iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    },
    formatCondition(condition) {
      const conditions = {
        'Clear': 'Dégagé',
        'Clouds': 'Nuageux',
        'Rain': 'Pluie',
        'Snow': 'Neige',
        'Thunderstorm': 'Orage',
        'Drizzle': 'Bruine',
        'Mist': 'Brume',
        'Fog': 'Brouillard'
      };
      
      return conditions[condition] || condition;
    }
  }
};
</script>

<style scoped>
.weather-stats {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.weather-stats h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.weather-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.chart-container {
  margin-top: 2rem;
  height: 300px;
  position: relative;
}

.chart-container h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    padding: 1rem 0.5rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
