import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/QuoteSearch.vue'),
      meta: {
        titleKey: 'titles.search',
      },
    },
    {
      path: '/bulk',
      name: 'bulk',
      component: () => import('@/pages/BulkPage.vue'),
      meta: {
        titleKey: 'titles.addQuotes',
      },
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/pages/EditPage.vue'),
      props: true,
      meta: {
        titleKey: 'titles.editQuote',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
      meta: {
        titleKey: 'titles.notFound',
      },
    },
  ],
})

export default router
