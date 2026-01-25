<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="container not-found">
    <n-h1 class="title">Страница не найдена</n-h1>

    <n-button type="primary" @click="router.push('/')">
      На главную
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
