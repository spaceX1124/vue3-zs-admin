<template>
  <el-select
    :model-value="innerValue"
    :loading="loading"
    loading-text="加载中"
    :disabled="options.disabled"
    :placeholder="options.placeholder"
    :multiple="options.multiple"
    :remote="options?.async?.remote"
    :filterable="options?.async?.remote || options.filterable"
    :remote-method="remoteMethod"
    :collapse-tags="options?.collapseTags"
    :collapse-tags-tooltip="options?.collapseTagsTooltip"
    clearable
    @change="change"
    @focus="focusRemoteMethod"
  >
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
import { debounce } from 'lodash-es'
import { ElMessage } from 'element-plus'
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
    hiddenOptions?: string[] | number[] | string | number;// 控制隐藏一个或多个选项，可本地数据，可远程数据
    disabledOptions?: string[] | number[] | string | number; // 控制一个或多个选项不可选，可本地数据，可远程数据
    filterable?: boolean; // 是否开启筛选
    collapseTags?: boolean; // 多选时是否将选中值按文字的形式展示
    collapseTagsTooltip?: boolean; // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
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
    emit('update:modelValue', newVal)
  }
})

// 要展示的list数据
const showList = ref<Common.List[]>([])
// 控制接口请求只请求一次
const flag = ref(true)
// 控制加载状态
const loading = ref(false)

// 远程搜索，我加个防抖
const debounceSearch = debounce(searchData, 300)
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
    componentEmits.change(val)
  }
}

// 远程加载数据
async function focusRemoteMethod () {
  if (unref(flag) && props.options.async && props.options.async.url && !props.options.async.remote) {
    try {
      const { url, data } = props.options.async
      console.log(url, data)
      loading.value = true
      // 先模拟请求
      const res = await getMockDataList()
      // const res: Global.Recordable[] = await http['get'](url, data)
      loading.value = false
      flag.value = false
      // 处理数据格式
      dealDataList(res)
    }catch (err) {
      console.log(err)
      showList.value = []
    }
  }
}

// 输入搜索加载远程数据，还是加一下防抖
function remoteMethod (query?: string) {
  if (query) {
    debounceSearch(query)
  } else {
    showList.value = []
  }
}
// 输入搜索请求
async function searchData (query?: string) {
  if (props.options.async && props.options.async.url && props.options.async.remote) {
    try {
      const { url, data, remoteKey } = props.options.async
      console.log(url, data)
      const postData = {
        ...data
      }
      if (remoteKey) {
        postData[remoteKey] = query
      } else {
        ElMessage.error('搜索要传remoteKey！！！')
        return
      }
      loading.value = true
      // 先模拟请求
      const res = await getMockDataList()
      // const res: Global.Recordable[] = await http['get'](url, data)
      loading.value = false
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
      // 判断是否需要隐藏一个或多个选项
      if (hiddenOptions) {
        if (isArray(hiddenOptions)) {
          if((hiddenOptions.map(String).find(val => val === String(arr[i][value])))) {
            continue
          }
        } else {
          if (String(hiddenOptions) === String(arr[i][value])) {
            continue
          }
        }
      }
      // 判断是否禁用当前选项
      if (disabledOptions) {
        if (isArray(disabledOptions)) {
          if((disabledOptions.map(String).find(val => val === String(arr[i][value])))) {
            arr[i].disabled = true
          }
        } else {
          arr[i].disabled = String(disabledOptions) === String(arr[i][value])
        }
      }
      listData.push({
        label: !isNullOrUndefOrEmpty(arr[i][label]) ? arr[i][label] : arr[i],
        value: !isNullOrUndefOrEmpty(arr[i][value]) ? arr[i][value].toString() : arr[i],
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