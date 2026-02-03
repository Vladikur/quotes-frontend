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
  NCollapse,
  NCollapseItem,
} from 'naive-ui'
import { SearchOutlined, AddCardOutlined } from '@vicons/material'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

import CardQuote from '../components/CardQuote.vue'
import { getQuotes, deleteQuote } from '../../api/quotes'

const search = ref('')
const loading = ref(false)
const quotes = ref([])
const totalCount = ref(0)
const page = ref(1)
const pageSize = ref(20)
const searchId = ref(null)
const isDevMode = ref(false)
const expandedNames = ref([])
const lang = ref('')

const router = useRouter()
const message = useMessage()
const { t } = useI18n()
const auth = useAuthStore()

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

async function loadQuotes() {
  loading.value = true

  try {
    const data = {
      page: page.value,
      limit: pageSize.value,
      searchId: searchId.value ? searchId.value : null,
      search: search.value ? search.value : null,
    }

    const res = await getQuotes(data)

    if (!res.data.success) throw new Error()

    quotes.value = res.data.data
    totalCount.value = res.data.count
    lang.value = res.data.lang

    if (res.data.searchId) searchId.value = res.data.searchId
  } catch {
    message.error(t('errors.loadQuotesFailed'))
  } finally {
    loading.value = false
  }
}

async function onDeleteQuote(id) {
  try {
    const res = await deleteQuote(id)

    if (!res.data.success) throw new Error()

    if (quotes.value.length === 1 && page.value > 1) page.value--

    searchId.value = null

    message.success(t('success.deleteQuoteSuccess'))

    await loadQuotes()
  } catch {
    message.error(t('errors.deleteQuoteFailed'))
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)

  isDevMode.value = params.get('dev-mode') === 'true'

  const hintShown = localStorage.getItem('search-hint-shown')

  if (!hintShown) {
    expandedNames.value = ['1']
    localStorage.setItem('search-hint-shown', 'true')
  }

  loadQuotes()
})

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
  <div class="container">
    <n-h1 class="title">{{ $t('searchQuotes.title') }}</n-h1>

    <div class="search-form">
      <NInput
        v-model:value="search"
        size="large"
        :placeholder="$t('searchQuotes.placeholder')"
        clearable
        @keyup.enter="onSearch"
        class="search-form__input"
        id="search"
        name="search"
      />

      <NButton size="large" type="primary" :loading="loading" @click="onSearch">
        <NIcon size="20">
          <SearchOutlined />
        </NIcon>
      </NButton>
    </div>

    <div v-if="auth.role === 'editor' || isDevMode">
      <div class="dev-text">
        <NText> lang: {{ lang }}, page: {{ page }}</NText>
      </div>
    </div>

    <n-collapse v-model:expanded-names="expandedNames" arrow-placement="right">
      <n-collapse-item :title="$t('searchQuotes.hintTitle')" name="1">
        <NText class="search-info">{{ $t('searchQuotes.hintText1') }}</NText>
        <NText class="search-info">{{ $t('searchQuotes.hintText2') }}</NText>
      </n-collapse-item>
    </n-collapse>

    <div class="search-count-container">
      <NText depth="3" class="search-count"> {{ $t('searchQuotes.total') }} {{ totalCount }} </NText>

      <NButton
        v-if="auth.role === 'editor'"
        @click="router.push(`bulk`)"
        type="info"
        size="small"
      >
        <NIcon size="18">
          <AddCardOutlined />
        </NIcon>
      </NButton>
    </div>

    <NSpin :show="loading" style="margin-top: 24px">
      <NSpace vertical size="large" v-if="quotes.length">
        <CardQuote
          v-for="q in quotes"
          :key="q.id"
          :quote="q"
          :is-dev-mode="isDevMode"
          @delete="onDeleteQuote"
        />
      </NSpace>

      <NEmpty v-else :description="$t('searchQuotes.empty')" />
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
.search-form {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  &__input {
    width: 100%;
  }
}

.search-count-container {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
}

.search-info {
  display: block;
  margin-bottom: 12px;
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
</style>
