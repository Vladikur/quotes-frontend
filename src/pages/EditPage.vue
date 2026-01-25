<script setup>
import { onMounted, ref } from 'vue'
import { NInput, NButton, NSpace, NText, useMessage } from 'naive-ui'

import { uploadQuotes, updateQuotes } from '../../api/quotes'

const rawInput = ref('')
const loading = ref(false)
const message = useMessage()
const isEditorMode = ref(false)

function validateQuotes(data, { requireId = false } = {}) {
  if (!Array.isArray(data)) {
    throw new Error('Ожидается массив объектов')
  }

  data.forEach((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Элемент #${index + 1} не является объектом`)
    }

    if (requireId) {
      if (item.id === undefined || item.id === null) {
        throw new Error(`Элемент #${index + 1}: поле "id" обязательно при обновлении`)
      }

      const idNum = Number(item.id)
      if (!Number.isInteger(idNum) || idNum <= 0) {
        throw new Error(`Элемент #${index + 1}: некорректный id`)
      }

      item.id = idNum
    }

    const requiredFields = ['author_en', 'author_ru', 'text_en', 'text_ru']

    requiredFields.forEach((field) => {
      if (!item[field] || typeof item[field] !== 'string') {
        throw new Error(`Элемент #${index + 1}: поле "${field}" обязательно и не может быть null`)
      }
    })
  })
}

async function onUpload(isUpdate) {
  loading.value = true

  try {
    let parsed

    try {
      parsed = new Function(`return ${rawInput.value}`)()
    } catch {
      throw new Error('Некорректный формат массива')
    }

    validateQuotes(parsed, { requireId: isUpdate })

    const res = isUpdate ? await updateQuotes(parsed) : await uploadQuotes(parsed)

    if (res.data.message) {
      const type = res.data.success ? 'success' : 'error'
      message[type](res.data.message)
    } else {
      message.success(`Цитаты успешно ${isUpdate ? 'обновлены' : 'загружены'}`)
    }

    // rawInput.value = ''
  } catch (err) {
    message.error(err.message || 'Ошибка при загрузке / обновлении цитат')
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
    <n-h1 class="title"> Добавление и обновление цитат </n-h1>

    <NText depth="3" class="upload-hint">
      Вставьте массив объектов с цитатами (JavaScript-формат)
    </NText>

    <NInput
      v-model:value="rawInput"
      type="textarea"
      placeholder="[{ author_en: '...', author_ru: '...', text_en: '...', text_ru: '...' }]"
      :autosize="{ minRows: 10 }"
      clearable
    />

    <NSpace justify="end" style="margin-top: 16px">
      <NButton type="primary" dashed :loading="loading" @click="() => onUpload(true)"> Обновить существующие </NButton>
      <NButton type="primary" :loading="loading" @click="() => onUpload(false)"> Загрузить новые </NButton>
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
