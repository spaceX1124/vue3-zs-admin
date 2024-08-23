import { type AxiosRequestConfig, AxiosResponse } from 'axios'
import service from './axios'
import { Result } from './type.ts'
export const http = {
  get(url: string, params?: Global.Recordable, config?: AxiosRequestConfig) {
    console.log(url, 'getgetget')
    return request({ url, params, ...config, method: 'get' })
  },
  post(url: string, data?: Global.Recordable, config?: AxiosRequestConfig) {
    console.log(url, 'postpostpost')
    return request({ url, data, ...config, method: 'post' })
  }
}

function request(config: AxiosRequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    service
      .request(config)
      .then((res: AxiosResponse<Result>) => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
