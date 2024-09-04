/**
 * 获取当前构建模式
 * 本地开发代码运行的是development
 * 打包production，test，dev，self, pressure根据打不同的包展示
 * */
export function getEnvMode (): string {
  return import.meta.env.MODE
}

/**
 * @author：张胜
 * @desc：是否处于正在开发的阶段
 * */
export function isDevMode (): boolean {
  return import.meta.env.ENV
}

/**
 * @author：张胜
 * @desc：是否处于生产环境阶段
 * */
export function isProdMode (): boolean {
  return import.meta.env.PROD
}

/**
 * @author：张胜
 * @desc：获取本地缓存所需的前缀key
 * 如'RXK__TEST__1.0.0__'
 * */
export function getStoragePrefix () {
  const { VITE_TITLE } = getAppEnv()
  return `${VITE_TITLE}__${getEnvMode()}__`.toUpperCase()
}

// 获取自定义环境变量
export function getAppEnv () {
  const { VITE_APP_ENV, VITE_TITLE } = import.meta.env
  return {
    VITE_APP_ENV,
    VITE_TITLE
  }
}