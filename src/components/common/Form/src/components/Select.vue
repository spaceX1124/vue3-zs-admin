<template>
  <el-select
    :model-value="innerValue"
    :loading="loading"
    loading-text="加载中"
    :disabled="options.disabled"
    :placeholder="options.placeholder"
    :multiple="options.multiple"
    clearable
    @change="change"
    @focus="remoteMethod">
    <el-option
      v-for="item in showList"
      :label="item.label"
      :value="item.value"
      :key="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>
<script lang="ts">
export type SelectEmitsType = {
  clear?: () => void;
  change?: (innerValue?: string | string[]) => void;
}
</script>
<script lang="ts" setup>
import { Common } from '@/types'
import { isArray, isNullOrUndefOrEmpty } from '@/utils/is.ts'
import type { AsyncType, RenderComponentSlot } from '@/types/form.ts'
interface PropsType {
  modelValue: string | number | string[] | number[];
  options?: {
    multiple?: boolean; // 是否多选
    disabled?: boolean; // 是否置灰
    placeholder?: string;
    dataList?: Common.List[];// 数据列表
    async?: AsyncType; // 异步请求及字段取值自定义
    renderComponentSlot?: RenderComponentSlot | RenderComponentSlot[];// 自定义插槽
    componentEmits?: SelectEmitsType; // 暴露出去的事件
  }
}
const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({
    multiple: false,
    clearable: true
  })
})

const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get () {
    if(isNullOrUndefOrEmpty(props.modelValue)) return props.options.multiple ? [] : ''
    if (props.options.multiple) {// 多选
      if (isArray(props.modelValue)) {
        return props.modelValue.map(String)
      }
      const valueAsString = String(props.modelValue)
      return valueAsString.includes(',') ? valueAsString.split(',') : [valueAsString]
    } else { // 单选
      return String(props.modelValue)
    }
  },
  set (newVal) {
    console.log(newVal, 'newVal222')
    emit('update:modelValue', newVal)
  }
})

// 要展示的list数据
const showList = ref<Common.List[]>([])
// 控制接口请求只请求一次
const flag = ref(true)
// 控制加载状态
const loading = ref(false)
onMounted(() => {
  // 不异步返回的情况下取dataList
  if (!props.options.async) {
    dealDataList(props.options.dataList)
  }
})

// 值只可能是字符串或者字符串数组了，因为下拉数据统一处理成字符串了
function change (val: string | string[]) {
  innerValue.value = val
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.change) {
    componentEmits.change(unref(innerValue))
  }
}

async function remoteMethod () {
  if (unref(flag) && props.options.async && props.options.async.url) {
    try {
      const { label = 'label', value = 'value', url, data } = props.options.async
      console.log(url, data)
      loading.value = true
      // 先模拟请求
      const res = await getMockDataList()
      // const res: Global.Recordable[] = await http['get'](url, data)
      loading.value = false
      flag.value = false
      showList.value = res.map(item => {
        return {
          label: item[label] || item,
          value: item[value] ? item[value].toString() : item
        }
      })
    }catch (err) {
      console.log(err)
      showList.value = []
    }
  }
}
// 处理下拉数据
function dealDataList (arr?: Common.List[]) {
  if (arr?.length) {
    showList.value = arr.map(item => {
      return {
        label: item.label,
        value: String(item.value),
        disabled: item.disabled
      }
    })
  }
}
// 模拟接口异步返回数据
function getMockDataList (): Promise<Global.Recordable[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '张三'
        }
      ])
    }, 1000)
  })
}
</script>