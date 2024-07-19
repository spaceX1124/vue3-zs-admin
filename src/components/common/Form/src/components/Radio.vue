<template>
  <el-radio-group
    :model-value="innerValue"
    @change="change">
    <el-radio
      v-for="item in showList"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{item.label}}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
export type RadioEmitsType = {
  change?: (innerValue?: string) => void;
}
</script>
<script lang="ts" setup>
import { Common } from '@/types'
import { isArray, isBoolean, isNullOrUndefOrEmpty } from '@/utils/is.ts'
import type { AsyncType } from '@/types/form.ts'

interface PropsType {
  modelValue: string | number | boolean;
  options?: {
    disabled?: boolean; // 是否置灰
    dataList?: Common.List[];// 数据列表
    async?: AsyncType; // 异步请求及字段取值自定义
    componentEmits?: RadioEmitsType; // 暴露出去的事件
    hiddenOptions?: string[] | number[] | string | number | boolean | boolean[];// 控制隐藏一个或多个选项，可本地数据，可远程数据
    disabledOptions?: string[] | number[] | string | number | boolean | boolean[]; // 控制一个或多个选项不可选，可本地数据，可远程数据
  }
}

const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({

  })
})

const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get () {
    if (isBoolean(props.modelValue)) {
      return props.modelValue
    }
    return String(props.modelValue)
  },
  set (newVal) {
    emit('update:modelValue', newVal)
  }
})

// 要展示的list数据
const showList = ref<Common.List[]>([])

onMounted(() => {
  // 不异步返回的情况下取dataList
  if (!props.options.async) {
    dealDataList(props.options.dataList)
  } else {
    remoteMethod()
  }
})

function change (val?: string | boolean) {
  innerValue.value = val
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.change) {
    componentEmits.change(val)
  }
}

// 远程加载数据
async function remoteMethod () {
  if (props.options.async && props.options.async.url && !props.options.async.remote) {
    try {
      const { url, data } = props.options.async
      console.log(url, data)
      // 先模拟请求
      const res = await getMockDataList()
      // const res: Global.Recordable[] = await http['get'](url, data)
      // 处理数据格式
      dealDataList(res)
    }catch (err) {
      console.log(err)
      showList.value = []
    }
  }
}

// 处理下拉数据
function dealDataList (arr?: Global.Recordable[]) {
  const { hiddenOptions, disabledOptions } = props.options
  let label = 'label'
  let value = 'value'
  if (props.options.async) {
    label = props.options.async.label || 'label'
    value = props.options.async.value || 'value'
  }
  const listData: Common.List[] = []
  if (arr?.length) {
    for (let i = 0; i < arr.length; i++) {
      // 判断是否需要隐藏一个或多个选项，有布尔值的情况
      if (hiddenOptions) {
        if (isArray(hiddenOptions)) {
          if (isBoolean(arr[i][value])) {
            if((hiddenOptions.find(val => val === arr[i][value]))) {
              continue
            }
          } else {
            if((hiddenOptions.map(String).find(val => val === String(arr[i][value])))) {
              continue
            }
          }
        } else {
          if (isBoolean(arr[i][value])) {
            if (hiddenOptions === arr[i][value]) {
              continue
            }
          } else {
            if (String(hiddenOptions) === String(arr[i][value])) {
              continue
            }
          }
        }
      }
      // 判断是否禁用当前选项，有布尔值的情况
      if (disabledOptions) {
        if (isArray(disabledOptions)) {
          if (isBoolean(arr[i][value])) {
            if((disabledOptions.find(val => val === arr[i][value]))) {
              arr[i].disabled = true
            }
          } else {
            if((disabledOptions.map(String).find(val => val === String(arr[i][value])))) {
              arr[i].disabled = true
            }
          }
        } else {
          if (isBoolean(arr[i][value])) {
            arr[i].disabled = disabledOptions === arr[i][value]
          } else {
            arr[i].disabled = String(disabledOptions) === String(arr[i][value])
          }
        }
      }
      // 可能有布尔值的选项
      listData.push({
        label: !isNullOrUndefOrEmpty(arr[i][label]) ? arr[i][label] : arr[i],
        value: !isNullOrUndefOrEmpty(arr[i][value]) ? 
          isBoolean(arr[i][value]) ? arr[i][value] : arr[i][value].toString()
          : arr[i],
        disabled: arr[i].disabled || false
      })
    }
  }
  showList.value = listData
}
// 模拟接口异步返回数据
function getMockDataList (): Promise<Global.Recordable[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        }
      ])
    }, 300)
  })
}
</script>