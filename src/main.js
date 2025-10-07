import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Importez les styles de base
import 'normalize.css';

const app = createApp(App);

// Utilisez le routeur
app.use(router);

// Utilisez Pinia pour la gestion d'état (optionnel)
app.use(createPinia());

app.mount('#app');
