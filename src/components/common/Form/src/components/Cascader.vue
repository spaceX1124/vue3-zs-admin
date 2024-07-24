<template>
  <el-cascader
    :model-value="innerValue"
    :options="showList"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    :props="optionProps"
    :filterable="options.filterable"
    @focus="focusRemoteMethod"
    @change="change"
    style="width: 100%"
  />
</template>
<script lang="ts">
export type CascaderEmitsType = {
  clear?: () => void;
  change?: (innerValue?: string | string[]) => void;
}
</script>
<script lang="ts" setup>
import { Common } from '@/types'
import { isArray, isNullOrUndefOrEmpty } from '@/utils/is.ts'
import type { AsyncType, RenderComponentSlot } from '@/types/form.ts'
import { cloneDeep, recursion } from '@/utils/tools.ts'
interface PropsType {
  modelValue: string | number | string[] | number[] | string[][] | number[][];
  options?: {
    multiple?: boolean; // 是否多选
    disabled?: boolean; // 是否置灰
    placeholder?: string;
    dataList?: Common.List[];// 数据列表
    async?: AsyncType; // 异步请求及字段取值自定义
    renderComponentSlot?: RenderComponentSlot | RenderComponentSlot[];// 自定义插槽
    componentEmits?: CascaderEmitsType; // 暴露出去的事件
    disabledOptions?: string[] | number[] | string | number; // 控制一个或多个选项不可选，可本地数据，可远程数据
    filterable?: boolean; // 该选项是否可以被搜索
    valIsArray?: boolean; // 抛出去的值是数组还是字符串
    checkStrictly?: boolean; // 是否严格的遵守父子节点不互相关联
    lazy?: boolean; // 是否开启动态加载
  }
}

const props = withDefaults(defineProps<PropsType>(), {
  // 设置默认值不会生效，因为外面已经设置了options的值了，说明已经有值了
  options: () => ({})
})
// element-plus官网要求必须这样写，不能直接在标签上绑定
const optionProps = computed(() => {
  return {
    multiple: props.options.multiple,
    checkStrictly: props.options.checkStrictly,
    lazy: props.options.lazy,
    async lazyLoad (node, resolve) {
      console.log(node, 'mode')
      const { level, data } = node
      if (props.options.async && props.options.async.url && props.options.lazy) {
        try {
          // 先模拟请求，目前没有通过async注入接口url，以后需要的时候再弄，目前不清楚接口是怎么使用，一个接口还是多个接口
          const res = level === 0 ? await getMockLazyDataList() : await getMockLazySubDataList({ id: data.id })
          // 处理数据格式
          const { disabledOptions } = props.options
          let label = props.options?.async?.label || 'label'
          let value = props.options?.async?.value || 'value'
          const listData: Common.List[] = []
          if (res && res?.length) {
            for (let i = 0; i < res.length; i++) {
              // 判断是否禁用当前选项
              if (disabledOptions) {
                if (isArray(disabledOptions)) {
                  if((disabledOptions.map(String).find(val => val === String(res[i][value])))) {
                    res[i].disabled = true
                  }
                } else {
                  res[i].disabled = String(disabledOptions) === String(res[i][value])
                }
              }
              listData.push({
                ...res[i],
                label: !isNullOrUndefOrEmpty(res[i][label]) ? res[i][label] : res[i],
                value: !isNullOrUndefOrEmpty(res[i][value]) ? res[i][value].toString() : res[i],
                disabled: res[i].disabled || false,
                leaf: level >= 1
              })
            }
          }
          resolve(listData)
        }catch (err) {
          console.log(err)
          showList.value = []
        }
      }
    }
  }
})

const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get () {
    // 统一转成数组
    if(isNullOrUndefOrEmpty(props.modelValue)) return []
    // 根据多选和单选处理值的类型
    // [['1', '2']]二维数组，目前只接受二维数组格式
    if (props.options.multiple) { // 多选
      // 如果是数组
      if (isArray(props.modelValue)) {
        return props.modelValue.map(item => {
          if (isArray(item)) {
            return item.map(String)
          }
          return String(item)
        })
      } else {
        console.log('格式不正确，多选的情况下要传二维数组')
        return []
      }
    } else { // 单选
      // ['1'. '2']，可接收字符串或者数字或者一维数组
      if (isArray(props.modelValue)) {
        return props.modelValue.map(String)
      }
      const valueAsString = String(props.modelValue)
      return valueAsString.includes(',') ? valueAsString.split(',') : [valueAsString]
    }
  },
  set (newVal) {
    let val
    // 如果是多选，只抛出当前二维数组
    if (props.options.multiple) {
      val = JSON.parse(JSON.stringify(newVal))
    } else { // 单选
      // 如果外部需要接受字符串
      if (!props.options.valIsArray) {
        val = newVal.join(',')
      } else {
        val = newVal.sort()
      }
    }
    emit('update:modelValue', val)
  }
})

// 要展示的list数据
const showList = ref<Global.Recordable[]>([])
// 控制接口请求只请求一次
const flag = ref(true)

onMounted(() => {
  // 不异步返回的情况下取dataList
  if (!props.options.async) {
    dealDataList(props.options.dataList)
  }
})

// 值只可能是字符串数组(一维、二维)了，因为下拉数据统一处理成字符串了
function change (val: any) {
  innerValue.value = val
  const { componentEmits } = props.options
  if (componentEmits && componentEmits.change) {
    componentEmits.change(val)
  }
}

// 远程加载数据
async function focusRemoteMethod () {
  if (unref(flag) && props.options.async && props.options.async.url && !props.options.lazy) {
    try {
      const { url, data } = props.options.async
      console.log(url, data)
      // 先模拟请求
      const res = await getMockDataList()
      // const res: Global.Recordable[] = await http['get'](url, data)
      flag.value = false
      // 处理数据格式
      dealDataList(res)
    }catch (err) {
      console.log(err)
      showList.value = []
    }
  }
}

// 处理级联数据
function dealDataList (arr?: Global.Recordable[]) {
  const cloneData = cloneDeep(arr)
  if (cloneData && cloneData.length) {
    const { disabledOptions } = props.options
    let label = props.options?.async?.label || 'label'
    let value = props.options?.async?.value || 'value'
    let children = props.options?.async?.children || 'children'
    // 树形结构，暂时不过滤选项，一般都没得这种需求
    // 递归处理
    recursion(cloneData, (item) => {
      // 判断是否禁用当前选项
      if (disabledOptions) {
        if (isArray(disabledOptions)) {
          if((disabledOptions.map(String).find(val => val === String(item[value])))) {
            item.disabled = true
          }
        } else {
          item.disabled = String(disabledOptions) === String(item[value])
        }
      }
      item.label = !isNullOrUndefOrEmpty(item[label]) ? item[label] : item
      item.value = !isNullOrUndefOrEmpty(item[value]) ? item[value].toString() : item
      item.disabled = item.disabled || false
    }, children)
  }
  showList.value = cloneData || []
}
// 模拟接口异步返回数据
function getMockDataList (): Promise<Global.Recordable[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '张三1',
          children: [
            {
              id: 11,
              name: '张三2',
              parentId: 1
            }
          ]
        },
        {
          id: 2,
          name: '李四1',
          children: [
            {
              id: 21,
              name: '李四2'
            }
          ]
        },
        {
          id: 3,
          name: '王五1'
        }
      ])
    }, 1000)
  })
}

// 加载选项数据
function getMockLazyDataList (): Promise<Global.Recordable[]> {
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
    }, 1000)
  })
}
// 加载子选项数据
function getMockLazySubDataList (param: {id: number}): Promise<Global.Recordable[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (param.id === 1) {
        resolve([
          {
            id: 12,
            name: '张三11'
          },
          {
            id: 22,
            name: '李四11'
          },
          {
            id: 32,
            name: '王五11'
          }
        ])
      }
      if (param.id === 2) {
        resolve([
          {
            id: 12,
            name: '张三12'
          },
          {
            id: 22,
            name: '李四12'
          },
          {
            id: 32,
            name: '王五12'
          }
        ])
      }
      if (param.id === 3) {
        resolve([
          {
            id: 12,
            name: '张三13'
          },
          {
            id: 22,
            name: '李四13'
          },
          {
            id: 32,
            name: '王五13'
          }
        ])
      }

    }, 1000)
  })
}
</script>