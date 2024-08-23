import { Common } from '@/types'
import { isNullOrUndefOrEmpty } from '@/utils/is'

// 身份证正则
export const IdCardReg =
  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
/**
 * 验证身份证号，如果填了就验证，没填的必填校验在外面处理
 * */
export function validateIdCard(rule: any, value: any, callback: any) {
  if (value && !IdCardReg.test(value)) {
    callback(new Error('请输入正确的身份证号码'), rule)
  } else {
    callback()
  }
}

// 手机号正则
export const phoneReg = /^1[3-9]\d{9}$/
/**
 * 验证手机号，如果填了就验证，没填的必填校验在外面处理
 * */
export function validatePhone(rule: any, value: any, callback: any) {
  if (value && !phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号码'), rule)
  } else {
    callback()
  }
}
// 邮箱
export const emailReg = /^\w+@[a-zA-Z0-9]+((\.[a-z0-9A-Z]{1,})+)$/
/**
 * 验证邮箱，如果填了就验证，没填的必填校验在外面处理
 * */
export function validateEmail(rule: any, value: any, callback: any) {
  if (value && !emailReg.test(value)) {
    callback(new Error('请输入正确的邮箱'), rule)
  } else {
    callback()
  }
}

/**
 * 区间字段校验
 */
export function validatorInputRange(params: { formModel: Global.Recordable; schema: Common.BasicForm }) {
  const { formModel, schema } = params
  const key1Validator = (rule: any, value: any, callback: any) => {
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
  return key1Validator
}
