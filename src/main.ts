import './assets/css/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { provideTheme, loadTheme } from './services/themeManager.ts'

loadTheme()

const app = createApp({
  setup() {
    provideTheme()
  },
  render: () => h(App),
})

app.use(router).mount('#app')
