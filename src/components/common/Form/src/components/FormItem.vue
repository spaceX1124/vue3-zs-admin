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
import { isNullOrUndefOrEmpty, isNumber, isObj } from '@/utils/is.ts'
import { ColEx } from '@/types/form.ts'

interface PropsType {
  schema: Common.BasicForm; // 当前字段配置信息
  formProps: BasicFormProps; // 当前表单配置信息
  formModel: Global.Recordable; // 当前表单数据
  setFormModelValue: (key: string, value: any) => void // 设置当前字段数据
}

const props = withDefaults(defineProps<PropsType>(), {})
const modelValue = computed({
  get () {
    const { key } = props.schema
    // 一开始取不到，就返回''
    return key && !isNullOrUndefOrEmpty(props.formModel[key]) ? props.formModel[key] : ''
  },
  set (newVal) {
    const { key } = props.schema
    key && props.setFormModelValue(key, newVal)
  }
})
// 当前组件名称
const component = computed(() => {
  return componentMap.get(props.schema.component)
})
// 给el-col绑定一些参数
const getBindingElCol = computed(() => {
  // 字段的布局配置
  const { colSpan } = props.schema
  // 表单的布局配置
  const { baseColspan } = props.formProps
  let colProps: ColEx = { span: 12 }
  if (isNumber(baseColspan)) {
    colProps.span = baseColspan
  }
  if (isObj(baseColspan)) {
    colProps = { ...baseColspan }
  }
  if (isNumber(colSpan)) {
    colProps.span = colSpan
  }
  if (isObj(colSpan)) {
    colProps = { ...colProps, ...colSpan }
  }

  return {
    ...colProps
  }
})

// 给el-form-item绑定一些参数
const getBindingElFormItem = computed(() => {
  const { title, key, component } = props.schema
  return {
    label: component !== 'BasicTitle' ? title : '',
    rules: getRules(),
    prop: key // @todo 看到这个突然想起来，如果表单项中嵌套表单项（表单项可能是不同的，也可能是一个数组循环渲染），记得写
  }
})

// 给component绑定一些参数
const getBindingComponent = computed(() => {
  let { componentProps = {}, title, component, dataList, async, renderComponentSlot, componentEmits } = props.schema
  return {
    options: {
      placeholder: `${NO_AUTO_LINK_COMPONENTS.includes(component) ? '请输入' : '请选择'}${title}`,
      valIsArray: true,
      ...componentProps,
      dataList,
      async,
      renderComponentSlot,
      componentEmits
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