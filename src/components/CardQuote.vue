<script setup>
import { NCard, NDivider } from 'naive-ui';

const props = defineProps({
  quote: {
    type: Object,
    required: true
  }
});

function normalizeForDisplay(text) {
  if (!text) return '';

  return text
    .replace(/\/n/g, '\n')        // исправляем ошибочный /n
    .replace(/\r\n|\r|\n/g, '\n'); // нормализуем переносы
}
</script>

<template>
  <NCard class="quote">
    <div class="quote__head">
      <n-h4 class="mb-3">
        <span>{{ quote.author_en }}</span>
      </n-h4>

      <n-text class="quote__source" depth="3" v-if="quote.source_en">
        {{ quote.source_en }}
      </n-text>
    </div>

    <n-p class="quote__main-text">
      {{ normalizeForDisplay(quote.text_en) }}
    </n-p>

    <n-text italic v-if="quote.robert_comment_en">
      Robert's comment:
      {{ normalizeForDisplay(quote.robert_comment_en) }}
    </n-text>

    <NDivider />

    <div class="quote__head">
      <n-h4>
        <span>{{ quote.author_ru }}</span>
      </n-h4>

      <n-text class="quote__source" depth="3" v-if="quote.source_ru">
        {{ quote.source_ru }}
      </n-text>
    </div>

    <n-p class="quote__main-text">
      {{ normalizeForDisplay(quote.text_ru) }}
    </n-p>

    <n-text italic v-if="quote.robert_comment_ru">
      Комментарий Роберта:
      {{ normalizeForDisplay(quote.robert_comment_ru) }}
    </n-text>
  </NCard>
</template>

<style lang="scss" scoped>
.quote {
  background: var(--element-background);
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;

    * {
      margin: 0;
    }
  }

  &__main-text {
    margin-top: 8px;
    font-size: 16px;
    white-space: pre-line;
  }

  &__source {
    text-align: end;
  }
}

@media (max-width: 768px) {
  .quote {
    &__head {
      flex-direction: column;
      gap: 4px;
    }

    &__source {
      text-align: start;
    }

    &__main-text {
      font-size: 14px;
    }
  }
}
</style>
