<template>
  <div style="margin-right: 30px;">
    <component :is="component" v-bind="getBindingComponent" v-model="modelValue" />
  </div>
</template>
<script lang="ts" setup>
import { Common } from '@/types'
import { componentMap, NO_AUTO_LINK_COMPONENTS } from '@/components/common/Form'
interface PropsType {
  schema: Common.BasicForm // 当前字段配置信息
  value?: any
}

const props = withDefaults(defineProps<PropsType>(), {})
const modelValue = ref(props.value)

// 当前组件名称
const component = computed(() => {
  return componentMap.get(props.schema.component)
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

defineExpose({
  modelValue
})
</script>