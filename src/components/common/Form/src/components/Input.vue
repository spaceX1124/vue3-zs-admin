<template>
  <el-input
    :model-value="innerValue"
    @input="input"
    :placeholder="options.placeholder"
    :type="options.type"
    :maxlength="options.maxlength"
    :disabled="options.disabled"
    :showWordLimit="options.showWordLimit"
    :showPassword="options.showPassword"
    :autosize="options.autosize"
    @blur="blur"
    @focus="focus"
    clearable
    @clear="clear"
  >
    <template #prefix v-if="checkSlot('prefix', schema)">
      <SlotRender :slotRender="getSlot('prefix', schema)"/>
    </template>
    <template #suffix v-if="checkSlot('suffix',schema)">
      <SlotRender :slotRender="getSlot('suffix',schema)"/>
    </template>
    <template #prepend v-if="checkSlot('prepend',schema)">
      <SlotRender :slotRender="getSlot('prepend',schema)"/>
    </template>
    <template #append v-if="checkSlot('append',schema)">
      <SlotRender :slotRender="getSlot('append',schema)"/>
    </template>
  </el-input>
</template>
<script lang="ts">
export type InputEmitsType = {
  blur?: (innerValue?: string) => void;
  focus?: (innerValue?: string) => void;
  input?: (innerValue?: string) => void;
  clear?: () => void;
}
</script>
<script lang="ts" setup>
import SlotRender from './slotRender.vue'
import { checkSlot, getSlot } from '../helper.ts'
import { Common } from '@/types'

interface PropsType {
  schema: Common.BasicParams; // 当前字段配置信息
  modelValue: string | number;
  options?: {
    placeholder?: string;
    type?: 'text' | 'textarea';
    maxlength?: string | number;
    decimal?: number; // 保留几位小数，输入框可能会用到
    integer?: boolean; // 只能输入整数
    positiveInteger?: boolean; // 只能输入正整数
    disabled?: boolean; // 是否置灰
    showWordLimit?: boolean; // 是否显示统计字数
    showPassword?: boolean; // 是否显示切换密码图标
    autosize?: Global.Recordable | boolean; // textarea高度配置
    autofocus?: boolean; // 是否自动聚焦
  }
}
const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({
    type: 'text',
    disabled: false
  })
})
const emit = defineEmits(['update:modelValue', 'blur'])
const innerValue = computed({
  get () {
    // 统一转成字符串
    return props.modelValue?.toString()
  },
  set (newVal) {
    emit('update:modelValue', newVal)
  }
})
function input (val: string) {
  let temp = val.toString()
  const { decimal, integer, positiveInteger } = props.options
  if (decimal) {// 保留小数位，如果是0就是整数，走下面
    temp = formatNumber(temp, decimal)
  } else if (integer) { // 整数
    temp = temp.replace(/[^\d]/g, '')
  } else if(positiveInteger) { // 正整数
    const regex = /^(?:[1-9]\d*|0)$/
    if (!regex.test(temp) || temp === '0') {
      temp = ''
    }
  }
  innerValue.value = temp
  const { componentEmits } = props.schema
  if (componentEmits && componentEmits.input) {
    componentEmits.input(temp)
  }
}
// 处理小数，返回正常的小数值
function formatNumber (val:string, dec: number){
  let temp = val.toString()
  temp = temp.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
  temp = temp.replace(/^\./g, '') // 验证第一个字符是数字
  temp = temp.replace(/\.{2,}/g, '') // 只保留第一个., 清除多余的
  const decimal = temp.split('.')[1]
  const integer = temp.split('.')[0]
  if(decimal){
    temp = integer + '.' + decimal.substring(0, Math.abs(dec)) // 防止传负数
  }
  return temp
}

function blur () {
  const { componentEmits } = props.schema
  if (componentEmits && componentEmits.blur) {
    componentEmits.blur(unref(innerValue))
  }
}
function focus () {
  const { componentEmits } = props.schema
  if (componentEmits && componentEmits.focus) {
    componentEmits.focus(unref(innerValue))
  }
}
function clear () {
  const { componentEmits } = props.schema
  if (componentEmits && componentEmits.clear) {
    componentEmits.clear()
  }
}

</script>