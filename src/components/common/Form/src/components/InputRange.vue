<template>
  <div class="center InputRange">
    <el-input
      style="flex: 1"
      :model-value="innerValue[0]"
      @input="input($event, 'first')"
      :placeholder="options.placeholder + '最小值'"
      type="text"
      :maxlength="options.maxlength"
      :disabled="options.disabled"
      @blur="blur($event, 'first')"
      @focus="focus($event, 'first')"
      clearable
      @clear="clear('first')" />
    <span style="margin: 0 12px">-</span>
    <el-input
      style="flex: 1"
      :model-value="innerValue[1]"
      @input="input($event, 'last')"
      :placeholder="options.placeholder + '最大值'"
      type="text"
      :maxlength="options.maxlength"
      :disabled="options.disabled"
      @blur="blur($event, 'last')"
      @focus="focus($event, 'last')"
      clearable
      @clear="clear('last')" />
  </div>
</template>
<script lang="ts">
import { isNullOrUndefOrEmpty, isArray, isString } from '@/utils/is'
export type InputRangeEmitsType = {
  blur?: (innerValue?: string, type?: 'first' | 'last') => void
  focus?: (innerValue?: string, type?: 'first' | 'last') => void
  input?: (innerValue?: string, type?: 'first' | 'last') => void
  clear?: (type: 'first' | 'last') => void
}
</script>
<script lang="ts" setup>
interface PropsType {
  modelValue: string | number | string[] | number[]
  options?: {
    placeholder?: string
    maxlength?: string | number
    decimal?: number // 保留几位小数，输入框可能会用到
    integer?: boolean // 只能输入整数
    positiveInteger?: boolean // 只能输入正整数
    disabled?: boolean // 是否置灰
    componentEmits?: InputRangeEmitsType // 暴露出去的事件
  }
}
const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({
    // type: 'text',
    // disabled: false
  })
})
const emit = defineEmits(['update:modelValue', 'blur'])
const innerValue = computed({
  get () {
    if (isNullOrUndefOrEmpty(props.modelValue)) return []
    if (isArray(props.modelValue)) {
      return props.modelValue.map(String)
    }
    if (isString(props.modelValue)) {
      return props.modelValue.split(',')
    }
    return []
  },
  set (newVal) {
    // 要想计算属性执行，基本数据类型可以直接改值，如果是引用类型，如数组，改里面的值是不会触发set的
    emit('update:modelValue', newVal)
  }
})
function input (val: string, type: 'first' | 'last') {
  let temp = val.toString()
  const { decimal, integer, positiveInteger } = props.options
  if (decimal) {
    // 保留小数位，如果是0就是整数，走下面
    temp = formatNumber(temp, decimal)
  } else if (integer) {
    // 整数
    temp = temp.replace(/[^\d]/g, '')
  } else if (positiveInteger) {
    // 正整数
    const regex = /^(?:[1-9]\d*|0)$/
    if (!regex.test(temp) || temp === '0') {
      temp = ''
    }
  }
  if (type === 'first') {
    innerValue.value[0] = removeLeadingZeros(temp)
  }
  if (type === 'last') {
    innerValue.value[1] = removeLeadingZeros(temp)
  }
  innerValue.value = unref(innerValue)
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.input) {
    componentEmits.input(temp, type)
  }
}
// 处理小数，返回正常的小数值
function formatNumber (val: string, dec: number) {
  let temp = val.toString()
  temp = temp.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
  temp = temp.replace(/^\./g, '') // 验证第一个字符是数字
  temp = temp.replace(/\.{2,}/g, '') // 只保留第一个., 清除多余的
  const decimal = temp.split('.')[1]
  const integer = temp.split('.')[0]
  if (decimal) {
    temp = integer + '.' + decimal.substring(0, Math.abs(dec)) // 防止传负数
  }
  return temp
}

function blur (e, type: 'first' | 'last') {
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.blur) {
    componentEmits.blur(type === 'first' ? unref(innerValue)[0] : unref(innerValue)[1], type)
  }
}
function focus (e, type: 'first' | 'last') {
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.focus) {
    componentEmits.focus(type === 'first' ? unref(innerValue)[0] : unref(innerValue)[1], type)
  }
}
function clear (type: 'first' | 'last') {
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.clear) {
    componentEmits.clear(type)
  }
}

// 处理输入01，001，0001，001.2等这些情况
function removeLeadingZeros (val: string) {
  // 使用正则表达式匹配前导零
  return val.replace(/^0+(?!\.|$)/, '') || ''
}
</script>
<style lang="scss" scoped>
.InputRange {
  width: 100%;
}
</style>
