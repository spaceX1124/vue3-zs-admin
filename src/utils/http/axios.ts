import axios, { type InternalAxiosRequestConfig } from 'axios'
import { apiPrefixPath } from '@/config'
import { ls } from '@/utils/storage.ts'
import { isEmpty } from '@/utils/is.ts'
import { createRequestForGet, createRequestSign } from '@/utils/aes.ts'

const service = axios.create({
  baseURL: apiPrefixPath,
  timeout: 1000 * 600, // 如果请求时间超过 `timeout` 的值，则请求会被中断
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截
service.interceptors.request.use((config: any) => {
  const token = ls.get('userLoginInfo').token
  const timestamps = new Date().getTime()
  const data = config.data || config.params || {}
  // 是否是json格式
  // const isJson = config.headers['Content-Type'] === 'application/json'
  // 如果不是json格式
  // const tempData = isJson ? data : Object.assign({ timestamps }, data)
  const tempData = data
  if (!isEmpty(data)) {
    // 对get请求的参数进行编码，URL 中的特殊字符不会干扰到 URL 的结构或导致错误，后端能正常解析出来
    // get请求参数{type: 1, h: 'a #', pageSize: 10, pageNum: 1}
    // 期望：https://gw-test.xlsltech.com/admin/product/pageList?type=1&h=a #&pageSize=10&pageNum=1
    // 实际：https://gw-test.xlsltech.com/admin/product/pageList?type=1&h=a%20
    if (config.method === 'get') {
      // 对请求参数进行编码，目的只是为了打印的时候看到参数是已经编码的
      for (const i in config.params) {
        config.params[i] = encodeURIComponent(config.params[i])
      }
      // 这一步是必须的，手动将编码之后的请求参数拼接到url上面，因为在拦截之前params参数就已经拼接到请求地址上，即使对config.params参数值进行编码也不生效
      const url = config.url?.split('?')[0]
      config.url = url + '?' + createRequestForGet(data)
    }
  } else {
    config.data = undefined
  }

  config.headers = {
    ...config.headers,
    token: token,
    sign: createRequestSign(tempData, config.method, timestamps).toLowerCase(),
    timestamps: timestamps.toString(),
    os: 'h5',
    osType: 'h5',
    businessType: 'admin'
  }

  /*
   * 因为axios中get会自动encodeURIComponent params参数
   * 空格等字符转换有出入 在公共initPage组件 将列表请求接口的参数拼接在 URL上
   * 所以这里需要将params清空
   *  */
  if (config.method === 'get' && config?.url?.indexOf('?') > -1) config.params = undefined
  return config
})
// 响应拦截
service.interceptors.response.use((response) => {
  return response.data
})

export default service