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
    },
    {
      path: '/bulk',
      name: 'bulk',
      component: BulkPage,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditPage,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
