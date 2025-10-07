<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

#app {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  min-height: 100vh;
  background-color: var(--background);
  line-height: 1.6;
}

/* Animation de transition de route */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Styles globaux */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--warning));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

/* Effet de verre */
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}
</style>
