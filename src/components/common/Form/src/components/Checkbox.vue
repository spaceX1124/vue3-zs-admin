<template>
  <!-- 当在父组件中给该子组件传参的时候，如果子组件没有接收，默认会透传，如果子组件不是唯一的根标签，就会报警告-->
  <div>
    <el-checkbox
      v-if="options.checkAll"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      style="width: 100%"
      :model-value="innerValue"
      :disabled="options.disabled"
      @change="change"
    >
      <el-checkbox
        v-for="item in showList"
        :label="item.label"
        :value="item.value"
        :key="item.value"
        :disabled="item.disabled"
      />
    </el-checkbox-group>
  </div>
</template>
<script lang="ts">
export type CheckboxEmitsType = {
  change?: (innerValue?: string | string[]) => void;
}
</script>
<script lang="ts" setup>
import { Common } from '@/types'
import { isArray, isNullOrUndefOrEmpty } from '@/utils/is.ts'
import type { AsyncType } from '@/types/form.ts'

interface PropsType {
  modelValue: string | number | string[] | number[];
  options?: {
    disabled?: boolean; // 是否置灰
    dataList?: Common.List[];// 数据列表
    async?: AsyncType; // 异步请求及字段取值自定义
    componentEmits?: CheckboxEmitsType; // 暴露出去的事件
    hiddenOptions?: string[] | number[] | string | number;// 控制隐藏一个或多个选项，可本地数据，可远程数据
    disabledOptions?: string[] | number[] | string | number; // 控制一个或多个选项不可选，可本地数据，可远程数据
    valIsArray?: boolean; // 抛出去的值是数组还是字符串
    checkAll?: boolean; // 是否显示全选
  }
}

const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({
    // valIsArray: true
  })
})

const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get () {
    // 统一转成数组
    if(isNullOrUndefOrEmpty(props.modelValue)) return []
    if (isArray(props.modelValue)) {
      return props.modelValue.map(String)
    }
    const valueAsString = String(props.modelValue)
    return valueAsString.includes(',') ? valueAsString.split(',') : [valueAsString]
  },
  set (newVal) {
    let val
    // 如果外部需要接受字符串
    if (!props.options.valIsArray) {
      val = newVal.join(',')
    } else {
      val = newVal.sort()
    }
    emit('update:modelValue', val)
  }
})

watch(() => innerValue.value, () => {
  props.options.checkAll && handleIsIndeterminate()
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

// 值只可能是字符串或者字符串数组了，因为下拉数据统一处理成字符串了
function change (val: any) {
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
      props.options.checkAll && handleIsIndeterminate()
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

// 全选
const checkAll = ref(false)
const isIndeterminate = ref(false)
function handleCheckAllChange (val: any) {
  innerValue.value = val ? showList.value.map(item => item.value) : []
  isIndeterminate.value = false
}
// 处理半选
function handleIsIndeterminate () {
  const checkedCount = innerValue.value.length
  checkAll.value = checkedCount === showList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < showList.value.length
}
</script>