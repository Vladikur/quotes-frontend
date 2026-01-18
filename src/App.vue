<script setup>
import QuoteSearch from './pages/QuoteSearch.vue';
import { NMessageProvider } from 'naive-ui';
</script>

<template>
  <NMessageProvider>
    <div class="page">
      <QuoteSearch />
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
