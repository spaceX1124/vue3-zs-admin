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
import { cloneDeep, deepMerge } from '@/utils/tools.ts'
import { useFormValues } from './hooks/useFormValues.ts'
import { useFormEvent } from './hooks/useFormEvent.ts'
import { type FormInstance } from 'element-plus'
import { Common } from '@/types'
import { isFunc } from '@/utils/is.ts'

// 表单数据
const formModel = reactive<Global.Recordable>({})
const ElFormRef = ref<FormInstance | null>(null)
// 用于存传入的字段数据，后续变更字段数据都处理该变量，不要去修改原始的字段数据（getProps.schemas）
const schemaRef = ref<Common.BasicForm[]>([])

// 修改表单中的值
function setFormModelValue (key: string, value: any): void {
  formModel[key] = value
}

const emit = defineEmits<EmitEvent>()

// 当前外部使用组件时通过useForm传入的一些参数（BasicTableProps）
let innerProps = ref<BasicFormProps>({})
let getProps = computed(() => {
  return { ...unref(innerProps) }
})

// 回显字段
const showSchemas = computed(() => {
  console.log('字段列表刷新了0', schemaRef)
  const schemas = cloneDeep(unref(schemaRef).length ? unref(schemaRef) : unref(getProps).schemas)
  // 处理可显示的字段
  const showList = schemas?.filter(schema => {
    // 如果是函数将更新字段方法传入
    if (schema.componentEmits && isFunc(schema.componentEmits)) {
      schema.componentEmits = schema.componentEmits({ updateSchema })
    }
    return !schema.formHidden
  })
  return showList || []
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
const { setFieldsValue, submit, updateSchema } = useFormEvent(getProps, {
  formModel,
  ElFormRef,
  emit,
  schemaRef,
  showSchemas
})

// 设置外部传递进来的参数
function setProps (propsData: BasicFormProps) {
  innerProps.value = deepMerge(unref(innerProps), propsData)
}

const formAction: FormActionType = {
  setProps,
  setFormModelValue, // 表单某个字段值改变时调用，为表单数据设置值
  setFieldsValue, // 手动为某些字段设置值
  updateSchema // 更新一个或多个字段列表
}
emit('register', formAction)

onMounted(() => {
  initDefault()
})
</script>