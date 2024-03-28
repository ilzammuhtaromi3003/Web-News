import { createApp } from 'vue'; // Import fungsi createApp dari modul Vue
import App from './App.vue'; // Impor komponen App
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

const app = createApp(App); // Buat aplikasi Vue
app.mount('#app'); // Mount aplikasi ke elemen dengan ID 'app'