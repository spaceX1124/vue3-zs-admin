import md5 from 'js-md5'
import { secretKey, offset, signKey, aes } from '@/config'
import CryptoJS from 'crypto-js'
import { isString } from '@/utils/is'
/**
 * md5签名加密
 * */
export function createRequestSign (data: Global.Recordable, method: 'get' | 'post', timestamps: number): string {
  let urlParams = ''
  const keyList = Object.keys(data)
  const filterKeyList = keyList.filter(key => {
    if (data[key] !== null && data[key] !== '') return key
  })
  if (method === 'get') {
    for(const key of filterKeyList) {
      urlParams += key !== filterKeyList[filterKeyList.length - 1] ? `${key}=${encodeURIComponent(data[key])}&` : `${key}=${encodeURIComponent(data[key])}`
    }
  } else {
    urlParams = JSON.stringify(data)
  }
  return (md5 as any)(`${urlParams}${timestamps}${signKey}`)
}
// export function createRequestSign (data: Global.Recordable, isJson: boolean, timestamps: number): string {
//   console.log(data, isJson, timestamps, 'ppp1')
//   let urlParams = ''
//   const keyList = Object.keys(data).sort()
//   const filterKeyList = keyList.filter(key => {
//     if (data[key] !== null && data[key] !== '') return key
//   })
//   if (isJson) {
//     urlParams = JSON.stringify(data) + `&timestamps=${timestamps}`
//   } else {
//     for(const key of filterKeyList) {
//       urlParams += key !== filterKeyList[filterKeyList.length - 1] ? `${key}=${encodeURIComponent(data[key])}&` : `${key}=${encodeURIComponent(data[key])}`
//     }
//   }
//   console.log(urlParams, 'urlParams', signKey)
//   return (md5 as any)(`${urlParams}&signKey=${signKey}`)
// }

export function createRequestForGet (data: Global.Recordable): string {
  const list = Object.keys(data)
  let urlParams = ''
  for (const key of list) {
    urlParams +=
        list[list.length - 1] !== key
          ? `${key}=${encodeURIComponent(<string>data[key])}&`
          : `${key}=${encodeURIComponent(<string>data[key])}`
  }
  return urlParams
}

/**
 * aes 加密，解密
 * */
export const Aes = {
  // 加密CBC模式
  encrypt (word: string) {
    const key = CryptoJS.enc.Utf8.parse(secretKey)
    const iv = CryptoJS.enc.Utf8.parse(offset)
    const src = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(src, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return aes + encrypted.toString()
  },
  // 解密CBC模式
  decrypt (word:string) {
    const key = CryptoJS.enc.Utf8.parse(secretKey)
    const iv = CryptoJS.enc.Utf8.parse(offset)
    const decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
  }
}
/**
 * 解密数据
 * */
export function decryptResponse (responseData: any) {
  let result = null
  if(isString(responseData) && responseData.indexOf(aes) !== -1) {
    const index = responseData.indexOf(aes)
    const tempStr = responseData.slice(index + aes.length, responseData.length)
    result = JSON.parse(Aes.decrypt(tempStr))
    return result
  }
  return responseData
}
