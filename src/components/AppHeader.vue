<script setup>
import { NButton } from 'naive-ui'
import { useLangStore } from '@/stores/lang'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const langStore = useLangStore()

const auth = useAuthStore()
const router = useRouter()
const { t } = useI18n()

function onLogout() {
  auth.logout()
  router.push('/')
}
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

        <NButton
          type="info"
          @click="onLogout"
          v-if="auth.role === 'editor'"
        >
          {{ $t('header.logOut') }}
        </NButton>
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
    gap: 16px;
  }

  &__lang-switch {
    margin-left: auto;
    display: flex;
    gap: 8px;
  }
}
</style>
