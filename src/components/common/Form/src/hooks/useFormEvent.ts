import { ComputedRef, Ref } from 'vue'
import { BasicFormProps, EmitEvent } from '../types/form.ts'
import { get, has, uniqBy } from 'lodash-es'
import { type FormInstance, ElMessage } from 'element-plus'
import { Common } from '@/types'
import { isArray, isObj } from '@/utils/is.ts'
import { isIncludeSimpleComponents } from '@/components/common/Form/src/helper.ts'
import { cloneDeep, deepMerge } from '@/utils/tools.ts'

interface ActionType {
  formModel: Global.Recordable; // 表单数据
  ElFormRef: Ref<FormInstance | null>; // 表单ref实例
  emit: EmitEvent
  schemaRef: Ref<Common.BasicForm[]>
}

/**
 * 表单相关方法
 * 设置表单初始值
 * @param {ComputedRef<BasicFormProps>} formProps 通过useForm传入的一些参数
 * @param {ActionType} actions
 * */
export function useFormEvent (formProps: ComputedRef<BasicFormProps>, actions: ActionType) {
  // 不要结构formProps，导致失去响应性了
  const { schemaRef, formModel, ElFormRef, emit } = actions
  // 设置表单值 {key1:123}，可多个设置
  function setFieldsValue (values: Global.Recordable) {
    if (Object.keys(values).length === 0) {
      return
    }

    unref(formProps).schemas?.forEach(schema => {
      const { key } = schema
      const value = get(values, key)
      const hasKey = has(values, key)
      if (hasKey) {
        formModel[key] = value
      }
    })
  }
  // 重置整个表单的值
  function resetFields () {
    // 另外写一个方法getDefaultValue，处理重置表单之后的值，可能某个字段的初始值就是[0，0]，所以还是需要这个方法的
  }
  // 表单验证
  async function validate () {
    const valid = await unref(ElFormRef)?.validate()
    console.log(valid, 'valid')
  }

  // 提交表单
  async function submit () {
    if (!ElFormRef) return
    try {
      await validate()
      console.log(formModel, 'formModel222')
      emit('submit', { ...formModel })
    }catch (err) {
      console.log(err, 'err1')
    }
  }

  // 更新一个或多个字段的配置，以达到控制字段的特性
  function updateSchema (schema: Common.BasicForm | Common.BasicForm[]) {
    let updateSchema:Common.BasicForm[] = []
    if (isObj(schema)) {
      updateSchema.push(schema as Common.BasicForm)
    }
    if (isArray(schema)) {
      updateSchema = [...schema]
    }
    const hasField = updateSchema.every(item => (
      isIncludeSimpleComponents(item.component) || (item.key && Reflect.has(item, 'key'))
    ))
    if (!hasField) {
      ElMessage.error('你写错了')
      return
    }
    const newSchema: Common.BasicForm[] = []
    const cloneSchemas = cloneDeep(unref(formProps).schemas)
    // 开始合并传进来的字段
    cloneSchemas?.forEach(val => {
      const curItem = updateSchema.find(item => item.key === val.key)
      if (curItem) {
        // 合并字段对象
        const mergeSchema = deepMerge(val, curItem)
        newSchema.push(mergeSchema)
      } else {
        newSchema.push({ ...val })
      }
    })
    console.log(newSchema, 'newSchema')
    // 刷新字段列表
    schemaRef.value = uniqBy(newSchema, 'key')
  }
  return {
    setFieldsValue,
    submit,
    validate,
    resetFields,
    updateSchema
  }
}