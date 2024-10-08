import type { BasicTableProps, PaginationInfo } from '../types/table.ts'
import { ComputedRef } from 'vue'
import { http } from '@/utils/http'

interface ActionType {
  setLoading: (loading: boolean) => void
  getPaginationInfo: ComputedRef<PaginationInfo>
  VxeTableRef: Ref<any>
}
interface Result {
  getTableData: ComputedRef<Global.Recordable[]>
  total: Ref<number>
  tableRequestParams: Ref<Global.Recordable>
  fetchTableData: Global.PromiseFn<void>
  refreshSearchRequestParams: Global.Fn
  clearSearchRequestParams: Global.Fn
}

/**
 * 处理表格数据
 * @param {ComputedRef<BasicTableProps>} innerProps 通过useTable传入的一些参数
 * @param {ActionType} actions 额外需要的一些参数
 * @return {Result} 需要暴露给外面的一些数据和方法
 * */
export function useSourceData (innerProps: ComputedRef<BasicTableProps>, actions: ActionType): Result {
  const { setLoading, getPaginationInfo, VxeTableRef } = actions
  // 表格数据
  const tableDataRef = ref<Global.Recordable[]>([])
  // 表格总数
  const total = ref(0)
  // 表格请求的所有参数
  const tableRequestParams = ref<Global.Recordable>({})
  // 快捷快捷搜索字段参数
  const searchRequestParams = ref<Global.Recordable>({})

  // 修改快捷搜索字段参数
  function refreshSearchRequestParams (obj: Global.Recordable) {
    searchRequestParams.value = { ...unref(searchRequestParams), ...obj }
  }
  // 清空快捷搜索字段参数
  function clearSearchRequestParams () {
    searchRequestParams.value = {}
  }

  // 监听外部传入的表格数据变更
  watch(
    () => innerProps.value.tableData,
    () => {
      console.log('表格数据变了')
      setLoading(false)
      const { tableData } = unref(innerProps)
      tableData && (tableDataRef.value = tableData)
    }
  )
  // 表格数据
  const getTableData = computed(() => [...unref(tableDataRef)])
  onMounted(async () => {
    if (innerProps.value.async) {
      await fetchTableData()
    }
  })
  // 接口获取表格数据
  async function fetchTableData () {
    // 处理请求参数;
    tableRequestParams.value = {
      ...unref(searchRequestParams),
      size: getPaginationInfo.value.pageSize,
      current: getPaginationInfo.value.pageNum,
      ...innerProps.value.async?.data
    }
    try {
      setLoading(true)
      if (!innerProps.value?.async?.url) {
        new Error('传接口进来啊')
        return
      }
      const { url, method } = innerProps.value.async
      // 发起请求
      const res = await http[method || 'get'](url, unref(tableRequestParams))
      // 拿到数据
      tableDataRef.value = res.records
      total.value = res.total
    } catch (e) {
      tableDataRef.value = []
      total.value = 0
    } finally {
      setLoading(false)
      await tableScrollTop()
    }
  }

  // 数据刷新将表格滚动条回到顶部
  async function tableScrollTop () {
    const $table = VxeTableRef.value
    if ($table) {
      await nextTick()
      setTimeout(() => {
        $table.scrollTo(0, 0)
      })
    }
  }
  return {
    getTableData,
    total,
    tableRequestParams,
    fetchTableData,
    refreshSearchRequestParams,
    clearSearchRequestParams
  }
}
