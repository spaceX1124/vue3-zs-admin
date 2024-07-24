<template>
  <el-date-picker
    v-model="innerValue"
    :type="options.type || 'date'"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    style="width: 100%"
    :format="options.format || 'YYYY-MM-DD'"
    :value-format="options.valueFormat || 'YYYY-MM-DD'"
    :startPlaceholder="options.startPlaceholder || '请选择'"
    :endPlaceholder="options.endPlaceholder || '请选择'"
    :disabled-date="disablePastDates"
  />
</template>
<script lang="ts">
export type DateEmitsType = {
  change?: (innerValue?: string | string[]) => void;
}
</script>
<script lang="ts" setup>
import { isArray, isString, isNullOrUndefOrEmpty } from '@/utils/is.ts'

interface PropsType {
  modelValue: string | string[];
  options?: {
    type?: 'year' | 'years' |'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange';
    placeholder?: string;
    disabled?: boolean; // 是否置灰
    componentEmits?: DateEmitsType; // 暴露出去的事件
    valIsArray?: boolean; // 抛出去的值是数组还是字符串
    format?: string; // 显示在输入框中的格式
    valueFormat?: string; // 绑定值的格式
    startPlaceholder?: string;
    endPlaceholder?: string;
    disablePastDate?: boolean; // 不能选择今天之前的日期
  }
}

const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({})
})

const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get () {
    // 如果是区间或者years，dates
    if (props.options.type === 'daterange' ||
        props.options.type === 'datetimerange' ||
        props.options.type === 'monthrange' ||
        props.options.type === 'years' ||
        props.options.type === 'dates'
    ) {
      if (isNullOrUndefOrEmpty(props.modelValue)) return []
      if (isArray(props.modelValue)) {
        return props.modelValue
      }
      if (isString(props.modelValue)) {
        return props.modelValue.split(',')
      }
    } else {
      return props.modelValue
    }
  },
  set (newVal) {
    let val
    if ((props.options.type === 'daterange' ||
         props.options.type === 'datetimerange' ||
         props.options.type === 'monthrange' ||
         props.options.type === 'years' ||
         props.options.type === 'dates') &&
        isArray(newVal)
    ) {
      if (!props.options.valIsArray) {
        val = newVal.join(',')
      } else {
        val = newVal
      }
    } else {
      val = newVal
    }
    emit('update:modelValue', val)
  }
})

// 值只可能是字符串或者字符串数组了，因为下拉数据统一处理成字符串了
function change (val: string | string[]) {
  console.log(val, 'val1')
  innerValue.value = val
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.change) {
    componentEmits.change(val)
  }
}

// 不能选择今天之前的日期
const disablePastDates = (currentDate: Date) => {
  if (!props.options.disablePastDate) return
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 设置时间为当天的00:00:00，确保精确比较日期部分
  return currentDate < today
}

</script>