import type { BasicTableProps, PaginationInfo } from '../types/table.ts'
import { ComputedRef } from 'vue'
import { http } from '@/utils/http'
import { myList } from '@/api'

interface ActionType {
  setLoading: (loading: boolean) => void;
  getPaginationInfo: ComputedRef<PaginationInfo>
}
interface Result {
  getTableData: ComputedRef<Global.Recordable[]>,
  total: Ref<number>
}

/**
 * 处理表格数据
 * @param {ComputedRef<BasicTableProps>} innerProps 通过useTable传入的一些参数
 * @param {ActionType} actions 额外需要的一些参数
 * @return {Result} 需要暴露给外面的一些数据和方法
 * */
export function useSourceData (innerProps:ComputedRef<BasicTableProps>, actions: ActionType): Result {
  const { setLoading, getPaginationInfo } = actions
  // 表格数据
  const tableDataRef = ref<Global.Recordable[]>([])
  // 表格总数
  const total = ref(0)
  // 监听外部传入的表格数据变更
  watch(() => innerProps.value.tableData, () => {
    console.log('表格数据变了')
    setLoading(false)
    const { tableData } = unref(innerProps)
    tableData && (tableDataRef.value = tableData)
  })
  // 表格数据
  const getTableData = computed(() => ([...unref(tableDataRef)]))
  onMounted(async () => {
    if(innerProps.value.async) {
      await fetchTableData()
    }
  })
  // 接口获取表格数据
  async function fetchTableData () {
    // 处理请求参数;
    const postData = {
      pageSize: getPaginationInfo.value.pageSize,
      pageNum: getPaginationInfo.value.pageNum,
      ...innerProps.value.async?.data
    }
    try {
      setLoading(true)
      // 发起请求
      const res = await http.post(myList.pageList, postData)
      console.log(res, 'tableData')
      setLoading(false)
      // 拿到数据
      tableDataRef.value = res.records
      total.value = res.total
    }catch (e) {
      setLoading(false)
      tableDataRef.value = []
      total.value = 0
    }
  }
  return {
    getTableData,
    total
  }
}