import { createRouter, createWebHistory } from 'vue-router'
import QuoteSearch from '@/pages/QuoteSearch.vue'
import BulkPage from '@/pages/BulkPage.vue'
import EditPage from '@/pages/EditPage.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: QuoteSearch,
      meta: {
        titleKey: 'titles.search',
      },
    },
    {
      path: '/bulk',
      name: 'bulk',
      component: BulkPage,
      meta: {
        titleKey: 'titles.addQuotes',
      },
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditPage,
      props: true,
      meta: {
        titleKey: 'titles.editQuote',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      meta: {
        titleKey: 'titles.notFound',
      },
    },
  ],
})

export default router
