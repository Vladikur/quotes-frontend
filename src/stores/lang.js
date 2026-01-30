import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: 'ru',
  }),
  actions: {
    setLang(lang) {
      this.lang = lang
      localStorage.setItem('lang', lang)
    },
    initLang() {
      const saved = localStorage.getItem('lang')
      if (saved) {
        this.lang = saved
        return
      }

      const systemLang = navigator.language.startsWith('en')
        ? 'en'
        : 'ru'

      this.lang = systemLang
      localStorage.setItem('lang', systemLang)
    },
  },
})
