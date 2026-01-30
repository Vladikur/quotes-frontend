<script setup>
import { onMounted, ref } from 'vue'
import { NInput, NButton, NSpace, NText, useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import { uploadQuotes } from '../../api/quotes'

const { t } = useI18n()
const message = useMessage()

const rawInput = ref('')
const loading = ref(false)
const isEditorMode = ref(false)

function validateQuotes(data) {
  if (!Array.isArray(data)) {
    throw new Error(t('errors.jsonArrayExpected'))
  }

  data.forEach((item) => {
    const requiredFields = ['author_en', 'author_ru', 'text_en', 'text_ru']

    requiredFields.forEach((field) => {
      if (!item[field] || typeof item[field] !== 'string') {
        throw new Error(
          `"${field}" ${t('errors.requiredFieldInvalid')}`
        )
      }
    })
  })
}

async function onUpload() {
  loading.value = true

  try {
    let parsed

    try {
      parsed = JSON.parse(rawInput.value)
    } catch {
      throw new Error(t('errors.invalidJson'))
    }

    validateQuotes(parsed)

    const res = await uploadQuotes(parsed)

    const type = res.data.success ? 'success' : 'error'
    message[type](res.data.message)
  } catch {
    message.error(t('errors.unknown'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  isEditorMode.value = params.get('edit-mode') === 'true'
})
</script>


<template>
  <div v-if="isEditorMode" class="container">
    <n-h1 class="title">{{ $t('bulkUpload.title') }}</n-h1>
    <NText depth="3" class="upload-hint">{{ $t('bulkUpload.hint') }}</NText>

    <NInput
      v-model:value="rawInput"
      type="textarea"
      placeholder='[
  {
    "author_en": "...",
    "author_ru": "...",
    "text_en": "...",
    "text_ru": "..."
  }
]'
      :autosize="{ minRows: 10 }"
      clearable
    />

    <NSpace justify="end" style="margin-top: 16px">
      <NButton type="primary" :loading="loading" @click="onUpload">
        {{ $t('bulkUpload.upload') }}
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
