<template>
  <el-form v-bind="getBindingElForm" :model="formModel" ref="ElFormRef">
    <el-row v-bind="getBindingElRow">
      <template v-for="schema in showSchemas" :key="schema.key">
        <FormItem
          :schema="schema"
          :formProps="getProps"
          :formModel="formModel"
          :setFormModelValue="setFormModelValue"
        />
      </template>
      <FormAction :submit="submit"/>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { BasicFormProps, EmitEvent, FormActionType } from './types/form.ts'
import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'
import { deepMerge } from '@/utils/tools.ts'
import { useFormValues } from './hooks/useFormValues.ts'
import { useFormEvent } from './hooks/useFormEvent.ts'
import { type FormInstance } from 'element-plus'

const formModel = reactive<Global.Recordable>({})
const ElFormRef = ref<FormInstance | null>(null)

// 修改表单中的值
function setFormModelValue (key: string, value: any) {
  formModel[key] = value
}

const emit = defineEmits<EmitEvent>()

// 当前外部使用组件时通过useForm传入的一些参数（BasicTableProps）
let innerProps = ref<BasicFormProps>({})
let getProps = computed(() => {
  return { ...unref(innerProps) }
})

const showSchemas = computed(() => {
  return unref(getProps).schemas || []
})

// 给el-form绑定的一些参数
const getBindingElForm = computed(() => {
  return {
    labelPosition: unref(getProps).labelPosition || 'top'
  }
})
// 给el-row绑定的一些参数
const getBindingElRow = computed(() => {
  return {
    gutter: unref(getProps).gutter || 20// 栅格间隔,默认是20
  }
})

// 初始化值相关
const { initDefault } = useFormValues(getProps, {
  formModel
})
// 操作表单数据相关方法
const { setFieldsValue, submit } = useFormEvent(getProps, {
  formModel,
  ElFormRef,
  emit
})

// 设置外部传递进来的参数
function setProps (propsData: BasicFormProps) {
  innerProps.value = deepMerge(unref(innerProps), propsData)
}

const formAction: FormActionType = {
  setProps,
  setFormModelValue,
  setFieldsValue
}
emit('register', formAction)

onMounted(() => {
  initDefault()
})
</script>