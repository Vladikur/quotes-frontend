<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="container not-found">
    <n-h1 class="title">
      {{ t('notFound.title') }}
    </n-h1>

    <n-button type="primary" @click="router.push('/')">
      {{ t('notFound.goHome') }}
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
