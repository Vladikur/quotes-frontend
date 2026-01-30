<script setup>
import { NMessageProvider } from 'naive-ui'
import { watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const { t, locale } = useI18n()
const langStore = useLangStore()

watch(
  () => langStore.lang,
  (val) => {
    locale.value = val
  },
  { immediate: true }
)

watchEffect(() => {
  const key = route.meta.titleKey

  if (key) {
    document.title = t(key)
  }
})
</script>

<template>
  <NMessageProvider>
    <div class="page">
      <AppHeader />

      <div class="gold-boat-img">
        <img src="/gold-boat.png" alt="Gold boat" />
      </div>

      <router-view />
    </div>
  </NMessageProvider>
</template>

<style lang="scss" scoped>
.page {
  padding: 0 20px 60px 20px;
}
</style>
