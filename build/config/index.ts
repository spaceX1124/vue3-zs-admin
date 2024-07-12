import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import { creatPlugin } from '../plugins'
import { execSync } from 'child_process'
let __GIT_HASH__ = ''
try {
  __GIT_HASH__ = JSON.stringify(execSync('git rev-parse HEAD', { encoding: 'utf8', stdio: 'pipe' }))
} catch (error) {
  console.error('Error executing git command:', error)
  if (error.stderr) {
    console.error('Error details:', error.stderr.toString())
  }
}

interface DefineOptions {
    overrides?: UserConfig
}
export function defineAppConfig<T extends DefineOptions> (defineOptions: T ) {
  const { overrides } = defineOptions
  const common = {
    root: process.cwd(),
    base: './', // 开发或生产环境服务的公共基础路径
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `
    //       @import "@/assets/styles/variables.scss";
    //       @import "@/assets/styles/mixin.scss";
    //      `
    //     }
    //   }
    // },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/style/element/index.scss" as *;
        @use "@/assets/style/variable.scss" as *;`
        }
      }
    },
    server: {
      port: 6688,
      open: false,
      https: false
    }
  }
  return defineConfig(({ mode }) => {
    const plugins = creatPlugin()
    const defaultConfig = {
      plugins,
      define: {
        __GIT_HASH__
      }
    }
    const config = mergeConfig(defaultConfig, common)
    return mergeConfig(config, overrides)
  })
}