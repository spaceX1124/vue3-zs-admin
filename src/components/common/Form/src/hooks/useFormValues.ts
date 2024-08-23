import type { BasicFormProps } from '../types/form.ts'
import { ComputedRef } from 'vue'
import { isArray, isNullOrUndefOrEmpty } from '@/utils/is.ts'
interface ActionType {
  formModel: Global.Recordable
}
/**
 * @param {ComputedRef<BasicFormProps>} formProps 通过useForm传入的一些参数
 * @param {ActionType} actions
 * */
export function useFormValues(formProps: ComputedRef<BasicFormProps>, actions: ActionType) {
  // 回显表单数据，@todo 要考虑异步数据也要回显的问题
  function echoFormValues() {
    const { schemas = [], formData = {} } = unref(formProps)
    const { formModel } = actions
    schemas.forEach((schema) => {
      const { defaultValue, key, keyArr } = schema
      if (key) {
        // 可能表单值需要的是多个，那在回显的时候返回的也是多个，需要将多个放在一起
        if (keyArr && keyArr.length) {
          const arr: string[] = keyArr.reduce((acc: string[], k: string) => {
            const val = !isNullOrUndefOrEmpty(formData[k]) ? String(formData[k]) : ''
            if (!isNullOrUndefOrEmpty(val)) {
              acc.push(val)
            }
            return acc
          }, [])
          formModel[key] = arr.length ? arr : isArray(defaultValue) ? defaultValue : defaultValue?.split(',') || []
        } else {
          formModel[key] = !isNullOrUndefOrEmpty(formData[key])
            ? formData[key]
            : !isNullOrUndefOrEmpty(defaultValue)
            ? defaultValue
            : ''
        }
      }
    })
  }
  return { echoFormValues }
}
