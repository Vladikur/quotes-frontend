<script setup>
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <NMessageProvider>
    <div class="page">
      <div class="gold-boat-img">
        <img src="/gold-boat.png" alt="Gold boat" />
      </div>

      <router-view />
    </div>
  </NMessageProvider>
</template>

<style lang="scss" scoped>
.page {
  padding: 40px 20px;
}

@media (max-width: 768px) {
  .page {
    padding: 20px;
  }
}
</style>
