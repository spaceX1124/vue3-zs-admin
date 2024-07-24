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
              component: () => import('@/views/form/input/index.vue')
            },
            {
              path: 'select',
              component: () => import('@/views/form/select/index.vue')
            },
            {
              path: 'radio',
              component: () => import('@/views/form/radio/index.vue')
            },
            {
              path: 'checkbox',
              component: () => import('@/views/form/checkbox/index.vue')
            },
            {
              path: 'cascader',
              component: () => import('@/views/form/cascader/index.vue')
            },
            {
              path: 'date',
              component: () => import('@/views/form/date/index.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
