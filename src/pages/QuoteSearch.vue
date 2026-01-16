<script setup>
import { ref, onMounted, nextTick } from 'vue'
import {
  NInput,
  NSpin,
  NSpace,
  NEmpty,
  NButton,
  NText,
  NIcon,
  NPagination,
  useMessage,
} from 'naive-ui'
import { SearchOutlined } from '@vicons/material'

import CardQuote from '../components/CardQuote.vue'
import { getQuotes } from '../../api/quotes.js'

const search = ref('')
const loading = ref(false)
const quotes = ref([])
const totalCount = ref(0)
const page = ref(1)
const pageSize = ref(20)
const searchId = ref(null)

const message = useMessage()

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

async function loadQuotes() {
  loading.value = true

  try {
    const params = {
      page: page.value,
      limit: pageSize.value
    }

    if (searchId.value) {
      params.searchId = searchId.value
    } else if (search.value) {
      params.search = search.value
    }

    const res = await getQuotes(params)

    quotes.value = res.data.data
    totalCount.value = res.data.count

    if (res.data.searchId) {
      searchId.value = res.data.searchId
    }

    if (res.data.message) {
      const messageType = res.data.success ? 'success' : 'error'

      message[messageType](res.data.message)
    }

  } catch {
    message.error('Не удалось загрузить цитаты')
  } finally {
    loading.value = false
  }
}

onMounted(loadQuotes)

async function onSearch() {
  page.value = 1
  searchId.value = null
  await loadQuotes()
}

async function onPageChange(newPage) {
  page.value = newPage
  await loadQuotes()
  await nextTick()
  scrollToTop()
}
</script>

<template>
  <div class="quotes-container">
    <div class="gold-boat-img">
      <img src="/gold-boat.png" alt="Gold boat" />
    </div>

    <n-h1 style="text-align: center">Поиск цитат</n-h1>

    <div class="search-form">
      <NInput
        v-model:value="search"
        size="large"
        placeholder="Введите тему запроса"
        clearable
        @keyup.enter="onSearch"
        class="search-form__input"
      />

      <NButton size="large" type="primary" :loading="loading" @click="onSearch">
        <NIcon>
          <SearchOutlined />
        </NIcon>
      </NButton>
    </div>

    <NText depth="3" class="search-info">
      Поиск работает с помощью ИИ: он определяет смысл запроса и подбирает похожие по смыслу цитаты,
      даже если слова не совпадают точно.
    </NText>

    <NText depth="3" class="search-info">
      Результаты отсортированы по релевантности — сначала самые подходящие по запросу.
    </NText>

    <NText depth="3" class="search-count"> Найдено цитат: {{ totalCount }} </NText>

    <NSpin :show="loading" style="margin-top: 24px">
      <NSpace vertical size="large" v-if="quotes.length">
        <CardQuote v-for="q in quotes" :key="q.id" :quote="q" />
      </NSpace>

      <NEmpty v-else description="Ничего не найдено" />
    </NSpin>

    <NPagination
      v-if="totalCount > pageSize"
      class="pagination"
      :page="page"
      :item-count="totalCount"
      :page-size="pageSize"
      :page-slot="6"
      @update:page="onPageChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.quotes-container {
  max-width: 720px;
  margin: 0 auto;
}

.gold-boat-img {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
}

.search-form {
  display: flex;
  align-items: center;
  gap: 8px;

  &__input {
    width: 100%;
  }
}

.search-info {
  display: block;
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.search-count {
  display: block;
  margin-top: 8px;
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .gold-boat-img {
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      object-fit: contain;
    }
  }
}
</style>
