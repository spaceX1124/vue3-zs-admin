import { isNullOrUnDef } from '@/utils/is'
import { getStoragePrefix, isProdMode } from '@/utils/env.ts'
import { Aes } from '@/utils/aes.ts'

// 7天过期
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

interface StorageParams {
  storage: Storage;
  preKey?: string;
  hasEncrypt?: boolean;
  timeout?: number;
}
/**
 * 创建storage实例对象
 * */
function createStorage (params: StorageParams) {
  const { storage, preKey = getStoragePrefix(), timeout = DEFAULT_CACHE_TIME, hasEncrypt = false } = params
  console.log(preKey, 'preKey')
  // WebStorage类
  class WebStorage {
    public storage: Storage
    public preKey: string
    readonly hasEncrypt: boolean
    constructor () {
      this.storage = storage
      this.preKey = preKey
      this.hasEncrypt = hasEncrypt
    }
    private getKey (key: string) {
      return `${this.preKey}${key}`.toUpperCase()
    }
    set (key: string, value:any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
      })
      const aesData = this.hasEncrypt ? Aes.encrypt(stringData) : stringData
      this.storage.setItem(this.getKey(key), aesData)
    }
    get (key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if(!val) return
      try {
        const aceVal = this.hasEncrypt ? Aes.decrypt(val) : val
        const data = JSON.parse(aceVal)
        console.log(data, 'data222')
        const { value, expire } = data
        // expire 为null，或者大于当前时间则返回数据
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        } else {
          // 删除当前缓存
          this.remove(key)
        }
      }catch (e) {
        return def
      }
    }
    remove (key: string) {
      this.storage.removeItem(this.getKey(key))
    }

  }
  return new WebStorage()
}

const ls = createStorage({ storage: localStorage, hasEncrypt: isProdMode() })
const ss = createStorage({ storage: sessionStorage, hasEncrypt: isProdMode() })
export {
  ls,
  ss
}
