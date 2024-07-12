import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { type PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VxeResolver } from '@vxecli/import-unplugin-vue-components'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/**
 * 插件的引入
 * */
export function creatPlugin ():PluginOption {
  const vitePlugins: PluginOption = [vue(), vueJsx()]
  vitePlugins.push(
    AutoImport({
      imports: [
        'vue',
        'vue-router'
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json'
      }
    }),
    Components({
      dirs: ['src/components'], // 指定自定义组件目录
      resolvers: [ // 自定义解析器，用于解析特定库的组件
        VxeResolver({ libraryName: 'vxe-table', importStyle: true }), // 自动引入虚拟表格组件
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  )
  return vitePlugins
}