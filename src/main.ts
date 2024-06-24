import '@/assets/main.css'
import 'vue-select/dist/vue-select.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import vSelect from 'vue-select'
import i18n from '@/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.component("app-select", vSelect)

app.mount('#app')
