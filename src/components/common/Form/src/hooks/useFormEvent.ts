import { ComputedRef, Ref } from 'vue'
import { BasicFormProps, EmitEvent } from '../types/form.ts'
import { get, has } from 'lodash-es'
import { type FormInstance } from 'element-plus'

interface ActionType {
  formModel: Global.Recordable; // 表单数据
  ElFormRef: Ref<FormInstance | null>; // 表单ref实例
  emit: EmitEvent
}

/**
 * 表单相关方法
 * 设置表单初始值
 * @param {ComputedRef<BasicFormProps>} formProps 通过useForm传入的一些参数
 * @param {ActionType} actions
 * */
export function useFormEvent (formProps: ComputedRef<BasicFormProps>, actions: ActionType) {
  // 设置表单初始值
  function setFieldsValue (values: Global.Recordable) {
    if (Object.keys(values).length === 0) {
      return
    }
    const { schemas = [] } = unref(formProps)
    schemas.forEach(schema => {
      const { key } = schema
      const value = get(values, key)
      const hasKey = has(values, key)
      if (hasKey) {
        const { formModel } = actions
        formModel[key] = value
      }
    })

  }
  // 表单验证
  async function validate () {
    const { ElFormRef } = actions
    const valid = await unref(ElFormRef)?.validate()
    console.log(valid, 'valid')
  }

  // 提交表单
  async function submit () {
    const { ElFormRef, emit, formModel } = actions
    if (!ElFormRef) return
    try {
      await validate()
      console.log(formModel, 'formModel222')
      emit('submit', { ...formModel })
    }catch (err) {
      console.log(err, 'err1')
    }
  }
  return {
    setFieldsValue,
    submit,
    validate
  }
}