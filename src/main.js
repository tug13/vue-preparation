import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { dom } from "@fortawesome/fontawesome-svg-core";
import 'bootstrap/dist/css/bootstrap.css';
dom.watch();
createApp(App).use(router).mount('#app')
