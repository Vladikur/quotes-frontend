import { createRouter, createWebHistory } from 'vue-router'
import QuoteSearch from '@/pages/QuoteSearch.vue'
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
      path: '/edit',
      name: 'edit',
      component: EditPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
