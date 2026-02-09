<script setup>
import { DeleteOutlineRound, EditOutlined } from '@vicons/material'
import { NCard, NDivider, NText } from 'naive-ui';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore();

const props = defineProps({
  quote: {
    type: Object,
    required: true
  },
  isDevMode: Boolean,
  isDeleting: Boolean,
});

const router = useRouter()
const emit = defineEmits(['delete'])

function normalizeForDisplay(text) {
  if (!text) return '';

  return text
    .replace(/\/n/g, '\n')        // исправляем ошибочный /n
    .replace(/\r\n|\r|\n/g, '\n'); // нормализуем переносы
}

function onDelete() {
  emit('delete', props.quote.id)
}
</script>

<template>
  <NCard
    class="quote"
    :class="{ '_disabled': isDeleting }"
  >
    <div v-if="auth.role === 'editor' || isDevMode" class="quote__header">
      <div>
        <div class="dev-text">
          <NText> id: {{ quote.id }}, </NText>
          <NText v-if="quote.score"> score: {{ Number(quote.score).toFixed(3) }} </NText>
        </div>
      </div>

      <div v-if="auth.role === 'editor'" class="quote__actions">
        <NButton @click="router.push(`edit/${quote.id}`)" type="info" size="small">
          <NIcon size="18">
            <EditOutlined />
          </NIcon>
        </NButton>

        <NPopconfirm
          :positive-text="$t('actions.delete')"
          :negative-text="$t('actions.cancel')"
          @positive-click="onDelete"
        >
          <template #trigger>
            <NButton type="error" size="small">
              <NIcon size="18">
                <DeleteOutlineRound />
              </NIcon>
            </NButton>
          </template>
          {{ $t('confirm.deleteQuote') }}
        </NPopconfirm>
      </div>
    </div>

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

  &._disabled {
    pointer-events: none;
    opacity: 0.2;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    gap: 20px;

    .dev-text {
      margin: unset;
    }
  }

  &__actions {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }

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
