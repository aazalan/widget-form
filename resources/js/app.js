import App from './components/App.vue'
import {createApp} from 'vue'
import {router} from "./router.js";

const app = createApp(App);

app.use(router)
    .mount('#app');
