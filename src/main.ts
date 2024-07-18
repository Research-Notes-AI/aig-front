import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import store from './store';

import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'

const app = createApp(App)
// app.use(store);

app.use(Toast, {// 在这里设置默认选项
});
app.use(createPinia())
app.use(router)

app.mount('#app')
