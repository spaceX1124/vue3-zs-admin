/**
 * 存一些需要特殊处理的表单校验函数validator
 * */

import { Common } from '@/types'
import { isNullOrUndefOrEmpty } from '@/utils/is'

/**
 * 区间字段校验
 */
export function validatorInputRange (params: { formModel: Global.Recordable; schema: Common.BasicForm }) {
  const { formModel, schema } = params
  return (rule: any, value: any, callback: any) => {
    // 非必填时，如果填了就校验
    const flag = formModel[schema.key].findIndex((val: string) => !isNullOrUndefOrEmpty(val))
    if ((schema.required || flag > -1) && isNullOrUndefOrEmpty(formModel[schema.key][0])) {
      callback(new Error(`${schema.title}最小值不能为空`))
    } else if ((schema.required || flag > -1) && isNullOrUndefOrEmpty(formModel[schema.key][1])) {
      callback(new Error(`${schema.title}最大值不能为空`))
    } else if ((schema.required || flag > -1) && Number(formModel[schema.key][1]) < Number(formModel[schema.key][0])) {
      callback(new Error(`${schema.title}最大值不能小于最小值`))
    } else {
      callback()
    }
  }
}
