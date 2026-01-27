<script setup>
import { onMounted, ref } from 'vue'
import { NInput, NButton, NSpace, NText, useMessage } from 'naive-ui'

import { uploadQuotes } from '../../api/quotes'

const rawInput = ref('')
const loading = ref(false)
const message = useMessage()
const isEditorMode = ref(false)

function validateQuotes(data) {
  if (!Array.isArray(data)) {
    throw new Error('Ожидается JSON-массив объектов')
  }

  data.forEach((item, index) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new Error(`Элемент #${index + 1} не является объектом`)
    }

    const requiredFields = ['author_en', 'author_ru', 'text_en', 'text_ru']

    requiredFields.forEach((field) => {
      if (!item[field] || typeof item[field] !== 'string') {
        throw new Error(
          `Элемент #${index + 1}: поле "${field}" обязательно и должно быть строкой`
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
      throw new Error('Некорректный JSON. Проверьте синтаксис')
    }

    validateQuotes(parsed)

    const res = await uploadQuotes(parsed)

    if (res.data?.message) {
      const type = res.data.success ? 'success' : 'error'
      message[type](res.data.message)
    } else {
      message.success('Цитаты успешно загружены')
    }
  } catch (err) {
    message.error(err.message || 'Ошибка при загрузке цитат')
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
    <n-h1 class="title">Добавление новых цитат</n-h1>

    <NText depth="3" class="upload-hint">
      Вставьте JSON-массив объектов с цитатами
    </NText>

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
        Загрузить
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
