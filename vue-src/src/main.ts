import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
// axiosを使用するためのキー
import { AXIOS_KEY } from '@/utils/constants'
// aXIOSプラグイン
import axiosPlugin from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia().use(createPersistedState()))
app.use(router)
app.provide(AXIOS_KEY, axiosPlugin)
app.mount('#app')
