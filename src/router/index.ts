import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: 'form',
          component: () => import('@/views/form/index.vue'),
          children: [
            {
              path: 'input',
              component: () => import('@//views/form/input/index.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
