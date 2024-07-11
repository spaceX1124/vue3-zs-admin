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
    />
  </el-select>
</template>
<script lang="ts">
export type SelectEmitsType = {
  clear?: () => void;
}
</script>
<script lang="ts" setup>
import { Common } from '@/types'
import { isArray } from '@/utils/is.ts'
interface PropsType {
  schema: Common.BasicParams; // 当前字段配置信息
  modelValue: string | number | string[] | number[];
  options?: {
    multiple?: boolean; // 是否多选
    disabled?: boolean; // 是否置灰
    placeholder?: string;
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
    if(!props.modelValue) return props.options.multiple ? [] : ''
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
    console.log(newVal, 'newVal')
    emit('update:modelValue', newVal)
  }
})

// 要展示的list数据
const showList = ref<Common.List[]>([])
const flag = ref(true)
const loading = ref(false)
onMounted(() => {
  // 不异步返回的情况下取dataList
  if (!props.schema.async) {
    dealDataList(props.schema)
  }
})

function change (val: string | number | string[] | number[]) {
  innerValue.value = val
}

async function remoteMethod () {
  if (unref(flag) && props.schema.async && props.schema.async.url) {
    try {
      const { label = 'label', value = 'value', url, data } = props.schema.async
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
function dealDataList () {
  if (props.schema?.dataList) {

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