import { cloneDeep as lodashCloneDeep, mergeWith, unionWith, isEqual, intersectionWith } from 'lodash-es'
import { isArray, isObj, isFunc, isBoolean } from '@/utils/is'
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

/**
 * 通用递归
 * */
export const recursion = (list: Global.Recordable[], fn: Global.Fn, children = 'children') => {
  const recursionFn = (arr: Global.Recordable[], parent?: Global.Recordable) => {
    let interruptFlag = false // 中断递归标志
    for (const item of arr) {
      interruptFlag = isFunc(fn) ? fn(item, parent) : false
      if (isBoolean(interruptFlag) && interruptFlag) { // 当函数返回布尔值且为true时,中断递归
        return true
      } else {
        interruptFlag = recursionFn(item[children] || [], item) || false
        if (isBoolean(interruptFlag) && interruptFlag) { // 当函数返回布尔值且为true时,中断递归
          return true
        }
      }
    }
  }
  recursionFn(list)
}

/**
 * 数组扁平化
 * */
export function getFlatArr (arr: Global.Recordable[], children = 'children'): Global.Recordable[] {
  return arr.reduce((pre: Global.Recordable[], current: Global.Recordable) => {
    let flatArr = [...pre, current]
    if (current[children]) flatArr = [...flatArr, ...getFlatArr(current[children])]
    return flatArr
  }, [])
}
