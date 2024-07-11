import { cloneDeep as lodashCloneDeep, mergeWith, unionWith, isEqual, intersectionWith } from 'lodash-es'
import { isArray, isObj } from '@/utils/is'
/**
 * 深拷贝
 * */
export function cloneDeep<T> (obj: T) {
  return lodashCloneDeep(obj)
}

/**
 * @author：张胜
 * @desc：递归合并两个对象。
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。[1,2] [1,2,3] => [1,2,3]
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。[1] [2] => []   [1,2] [1] => [1]
 *        - "concat": Concatenate the arrays. 连接数组。[1] [1,2,3] => [1,1,2,3]
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。[1] [2] => [2]
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined> (
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace'
): T & U {
  if (!target) {
    return source as T & U
  }
  if (!source) {
    return target as T & U
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual)
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual)
        case 'concat':
          return sourceValue.concat(targetValue)
        case 'replace':
          return targetValue
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`)
      }
    }
    if (isObj(targetValue) && isObj(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays)
    }
    return undefined
  })
}