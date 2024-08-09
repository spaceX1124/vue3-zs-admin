import { isString } from '@/utils/is.ts'

/**
 * 将图片转成base64
 * 图片上传之后我们并不能直接获取到图片的分辨率，我们需要先将其转为base64的格式再去获取图片的分辨率，我们可以使用FileReader来先对文件进行转换
 * */
export function imgToBase64 (file:File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    reader.readAsDataURL(file)
  })
}
interface ImageDimensions {
  width: number;
  height: number;
}
/**
 * 获取图片的分辨率
 * */
export function getImgPx (img:string | ArrayBuffer | null):Promise<ImageDimensions> {
  if (!isString(img)) {
    return Promise.reject(new Error('Invalid image data URL'))
  }
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const width = image.width
      const height = image.height
      resolve({ width, height })
    }
    image.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    image.src = img
  })
}