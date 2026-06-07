import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import './assets/main.css'

import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth.ts'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const authStore = useAuthStore()
await authStore.initialize()

app.use(router)

app.mount('#app')
