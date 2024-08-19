import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/style/index.scss'
import App from './App.vue'
import './router/permission.ts'
import '@/utils/mock.ts'

import { VxeIcon, VxeLoading, VxeTooltip } from 'vxe-pc-ui'
const app = createApp(App)
function bootstrap() {
  app.use(router)
  app.use(createPinia())
  app.use(VxeIcon).use(VxeLoading).use(VxeTooltip)
  app.mount('#app')
}
bootstrap()
