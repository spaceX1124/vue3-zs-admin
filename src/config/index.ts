import { getAppEnv } from '@/utils/env.ts'

let apiPrefixPath: string
const signKey: string = 'EDH6sOgEILMSMPkJt78ilfMUpJ5FajXJ'
let ossPath: string
const secretKey = 'GQDTXGf7EZuCqwNG' // 解密用的key
const offset = '8GUUxywnlW0v9hk6'
const aes = 'enc-' // 加密解密前缀
const { VITE_APP_ENV: runType } = getAppEnv()

switch (runType) {
  case 'pro_qh': // 线上环境
    apiPrefixPath = 'https://gw.xlsltech.com/admin/'
    ossPath = 'https://oss.xlsltech.com/'
    break
  case 'test': // 外网测试环境
    apiPrefixPath = 'https://gw-test.xlsltech.com/admin/'
    ossPath = 'https://test-oss.xlsltech.com/'
    break
  default: // 默认环境
    apiPrefixPath = 'https://gw-test.xlsltech.com/admin/'
    ossPath = 'https://test-oss.xlsltech.com/'
    break
}
export {
  apiPrefixPath,
  signKey,
  ossPath,
  secretKey,
  offset,
  aes
}
