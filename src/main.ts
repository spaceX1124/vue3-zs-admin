import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '@/assets/style/index.scss'
import App from './App.vue'
import router from './router'
import './router/permission.ts'
import '@/utils/mock.ts'

import {
  VxeTable,
  VxeColumn
} from 'vxe-table'
// 用于表格loading
import { VxeIcon, VxeLoading, VxeTooltip } from 'vxe-pc-ui'
// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/styles/cssvar.scss'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VxeTable)
app.use(VxeColumn)
app.use(VxeIcon)
app.use(VxeLoading)
app.use(VxeTooltip)

app.mount('#app')
