<template>
  <div class="home">
    <div class="hero glass-effect">
      <div class="hero-content">
        <h1>Météo App</h1>
        <p class="subtitle">Découvrez la météo en temps réel de n'importe quelle ville</p>
        <div class="features">
          <div class="feature">
            <span class="icon">🌡️</span>
            <span>Températures précises</span>
          </div>
          <div class="feature">
            <span class="icon">⭐</span>
            <span>Favoris illimités</span>
          </div>
          <div class="feature">
            <span class="icon">📱</span>
            <span>100% Responsive</span>
          </div>
        </div>
        <router-link to="/dashboard" class="btn">
          <span>Explorer la météo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </router-link>
      </div>
      <div class="weather-illustration">
        <div class="sun"></div>
        <div class="cloud"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #FFB347, #FFCC33);
  position: relative;
  overflow: hidden;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5zm-5-39c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="rgba(255,255,255,0.1)" fill-rule="evenodd"/></svg>');
  opacity: 0.1;
  z-index: 1;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding: 4rem;
  border-radius: 20px;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  z-index: -1;
}

.hero-content {
  max-width: 600px;
  text-align: left;
  position: relative;
  z-index: 3;
}

h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #FF8C00, #FF5722);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.subtitle {
  font-size: 1.5rem;
  color: #5D4037;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 90%;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feature .icon {
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #FF8C00, #FF5722);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3);
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn svg {
  margin-left: 0.75rem;
  transition: transform 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 87, 34, 0.4);
}

.btn:hover svg {
  transform: translateX(5px);
}

.weather-illustration {
  position: relative;
  width: 400px;
  height: 300px;
  margin-left: 2rem;
}

.sun {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #FFD54F 0%, #FFB300 70%);
  border-radius: 50%;
  top: 50px;
  right: 50px;
  box-shadow: 0 0 50px #FFD54F;
  animation: pulse 4s infinite alternate;
}

.cloud {
  position: absolute;
  width: 180px;
  height: 60px;
  background: white;
  border-radius: 60px;
  bottom: 80px;
  left: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  background: white;
  border-radius: 50%;
}

.cloud::before {
  width: 80px;
  height: 80px;
  top: -40px;
  left: 30px;
}

.cloud::after {
  width: 50px;
  height: 50px;
  top: -25px;
  right: 30px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 50px #FFD54F;
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 0 70px #FFD54F;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 3rem 2rem;
  }
  
  .hero-content {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .subtitle {
    max-width: 100%;
  }
  
  .features {
    justify-content: center;
  }
  
  .weather-illustration {
    margin: 0 auto;
    transform: scale(0.8);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
  }
  
  .features {
    flex-direction: column;
    align-items: center;
  }
  
  .weather-illustration {
    transform: scale(0.7);
  }
}

@media (max-width: 480px) {
  .home {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .btn {
    width: 100%;
  }
  
  .weather-illustration {
    transform: scale(0.6);
  }
}
</style>
