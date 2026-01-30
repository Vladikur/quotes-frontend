<script setup>
import { NButton } from 'naive-ui'
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__lang-switch">
          <NButton
            :type="langStore.lang === 'ru' ? 'primary' : 'default'"
            @click="langStore.setLang('ru')"
          >
            RU
          </NButton>

          <NButton
            :type="langStore.lang === 'en' ? 'primary' : 'default'"
            @click="langStore.setLang('en')"
          >
            EN
          </NButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &__inner {
    display: flex;
    width: 100%;
    padding: 20px 0;
  }

  &__lang-switch {
    margin-left: auto;
    display: flex;
    gap: 8px;
  }
}
</style>
