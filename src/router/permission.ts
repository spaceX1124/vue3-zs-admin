import router from './index'
import { mainUser } from '@/store'
import { recursion } from '@/utils/tools.ts'
import { Business } from '@/types'

router.beforeEach(async (to, from, next) => {
  const mainUserStore = mainUser()
  if (!mainUserStore.flag) {
    // 获取菜单
    const menuList = await mainUserStore.getMenuList()
    // 注入路由对象
    generateRoutes(menuList)
    next({ ...to })
  } else {
    next()
  }

})
router.afterEach((to, from, next) => {})

// 动态注入路由
function generateRoutes (menuList: Business.MenuItem[]) {
  router.addRoute({
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue')
  })
  recursion(menuList, (item, parent) => {
    if (parent) {
      router.addRoute(parent.name, {
        path: item.path,
        name: item.name,
        component: () => import(`@/views/${parent.path}/${item.path}/index.vue`)
      })
    } else {
      router.addRoute('Layout', {
        path: item.path,
        name: item.name,
        component: () => import(`@/views/${item.path}/index.vue`)
      })
    }
  })
}