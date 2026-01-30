<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NInput, NButton, NSpace, useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import { getQuoteById, updateQuote } from '../../api/quotes'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { t } = useI18n()

const rawInput = ref('')
const loading = ref(false)
const isEditorMode = ref(false)

const quoteId = route.params.id

async function loadQuote() {
  try {
    loading.value = true

    const { data } = await getQuoteById(quoteId)

    // красиво кладём объект в textarea
    rawInput.value = JSON.stringify({
      author_en: data.data.author_en,
      author_ru: data.data.author_ru,
      text_en: data.data.text_en,
      text_ru: data.data.text_ru,
      source_en: data.data.source_en,
      source_ru: data.data.source_ru,
      robert_comment_en: data.data.robert_comment_en,
      robert_comment_ru: data.data.robert_comment_ru,
    }, null, 2)
  } catch {
    message.error(t('errors.unknown'))
  } finally {
    loading.value = false
  }
}

async function onUpdate() {
  let parsed

  try {
    parsed = JSON.parse(rawInput.value)
  } catch {
    message.error(t('errors.invalidJson'))
    return
  }

  try {
    loading.value = true

    const res = await updateQuote(quoteId, parsed)

    const type = res.data.success ? 'success' : 'error'
    message[type](res.data.message)

    if (res.data.success)
      router.push('/?dev-mode=true&edit-mode=true')
  } catch {
    message.error(t('errors.unknown'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  isEditorMode.value = params.get('edit-mode') === 'true'

  if (isEditorMode.value && quoteId) {
    loadQuote()
  }
})
</script>

<template>
  <div v-if="isEditorMode" class="container">
    <n-h1 class="title"> {{ t('editQuote.title') }} </n-h1>

    <NInput
      v-model:value="rawInput"
      type="textarea"
      placeholder="{ author_en: '...', author_ru: '...', text_en: '...', text_ru: '...' }"
      :autosize="{ minRows: 10 }"
      clearable
    />

    <NSpace justify="end" style="margin-top: 16px">
      <NButton type="primary" :loading="loading" @click="onUpdate">
        {{ t('editQuote.update') }}
      </NButton>
    </NSpace>
  </div>
</template>

<style lang="scss" scoped>
.upload-hint {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
}
</style>
