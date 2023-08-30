import { createApp } from 'vue'
import 'sweetalert'
import '@/assets/sweetalert/sweetalert.css'
import '@/assets/css/bootstrap.min.css'
import '@/styles/index.css'
import '~@/styles/index.scss'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
