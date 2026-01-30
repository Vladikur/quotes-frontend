import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import { useLangStore } from './stores/lang'

import '/styles/base/fonts.scss'
import '/styles/main.scss'

const app = createApp(App)

app.use(naive)
app.use(createPinia())
app.use(i18n)
app.use(router)

const langStore = useLangStore()
langStore.initLang()

i18n.global.locale.value = langStore.lang

app.mount('#app')
