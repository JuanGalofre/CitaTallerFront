import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './components/stores/auth'
import axios from 'axios'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)
app.use(createPinia())
app.use(ToastPlugin)
app.use(router)

const auth = useAuthStore()
auth.loadFromStorage()
if (auth.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
}

app.mount('#app')
