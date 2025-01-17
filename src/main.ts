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
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const app = createApp(App)

app.use(createPinia().use(createPersistedState()))
app.use(router)
app.provide(AXIOS_KEY, axiosPlugin)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
