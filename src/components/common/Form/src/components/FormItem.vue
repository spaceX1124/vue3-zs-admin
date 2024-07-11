<template>
  <el-col v-bind="getBindingElCol">
    <el-form-item v-bind="getBindingElFormItem">
      <component :is="component" v-bind="getBindingComponent" v-model="modelValue"/>
    </el-form-item>
  </el-col>
</template>
<script lang="ts" setup>
import { BasicFormProps } from '../types/form.ts'
import { componentMap } from '../componentMap.ts'
import { type FormItemRule } from 'element-plus'
import { NO_AUTO_LINK_COMPONENTS } from '../helper.ts'
import { Common } from '@/types'

interface PropsType {
  schema: Common.BasicParams; // 当前字段配置信息
  formProps: BasicFormProps; // 当前表单配置信息
  formModel: Global.Recordable; // 当前表单数据
  setFormModelValue: (key: string, value: any) => void // 设置当前字段数据
}

const props = withDefaults(defineProps<PropsType>(), {})
const modelValue = computed({
  get () {
    const { key } = props.schema
    // 一开始取不到，就返回''
    return props.formModel[key] || ''
  },
  set (newVal) {
    const { key } = props.schema
    props.setFormModelValue(key, newVal)
  }
})
// 当前组件名称
const component = computed(() => {
  return componentMap.get(props.schema.component)
})
// 给el-col绑定一些参数
const getBindingElCol = computed(() => {
  const { colSpan = {} } = props.schema
  const { baseColspan = { span: 12 } } = props.formProps
  const colProps = { ...baseColspan, ...colSpan }
  return {
    ...colProps
  }
})

// 给el-form-item绑定一些参数
const getBindingElFormItem = computed(() => {
  const { title, key } = props.schema
  return {
    label: title,
    rules: getRules(),
    prop: key
  }
})

// 给component绑定一些参数
const getBindingComponent = computed(() => {
  let { componentProps = {}, title, component } = props.schema
  return {
    options: {
      placeholder: `${NO_AUTO_LINK_COMPONENTS.includes(component) ? '请输入' : '请选择'}${title}`,
      ...componentProps
    },
    schema: props.schema
  }
})

// 获取表单验证规则
function getRules () {
  let rules: FormItemRule[] = []
  const { required, dynamicRules, component, title } = props.schema
  if (dynamicRules) {
    rules = dynamicRules({ formModel: props.formModel, schema: props.schema })
  }
  if (required) {
    const trigger = NO_AUTO_LINK_COMPONENTS.includes(component) ? 'blur' : 'change'
    if(!rules.length) {
      rules = [{ required: true, message: `${title}必填`, trigger }]
    } else {
      const requiredIndex: number = rules.findIndex((rule) => Reflect.has(rule, 'required'))
      if (requiredIndex === -1) {
        rules.push({ required: true, message: `${title}必填`, trigger })
      }
    }
  }
  return rules
}

</script>