import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from '@/App.vue'
import router from '@/router'
import { API_URL } from '@/common/config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

this.axios.defaults.baseURL = API_URL

app.mount('#app')
