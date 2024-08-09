import { ComputedRef, Ref } from 'vue'
import type { BasicTableProps, PaginationInfo } from '../types/table.ts'

interface ActionType {
  fetchTableData: Global.PromiseFn;
  dealPageSelected: Global.Fn
}

interface Result {
  getPaginationInfo: ComputedRef<PaginationInfo>;
  paginationInfoRef: Ref<PaginationInfo>;
  sizeChange: Global.PromiseFn;
  currentChange: Global.PromiseFn;
}
/**
 * 处理分页数据
 * @param {ComputedRef<BasicTableProps>} innerProps 通过useTable传入的一些参数
 * @param actions
 * @return {Result} 需要暴露给外面的一些数据和方法
 * */
export function usePagination (innerProps:ComputedRef<BasicTableProps>, actions: ActionType): Result {
  const { fetchTableData, dealPageSelected } = actions
  console.log(innerProps, 'innerProps123')
  // 分页信息
  const paginationInfoRef = ref<PaginationInfo>({
    pageNum: 1,
    pageSize: 10
  })
  onMounted(() => {
    paginationInfoRef.value = unref(innerProps).paginationInfo || {
      pageNum: 1,
      pageSize: 10
    }
  })

  // 获取当前分页信息
  const getPaginationInfo = computed(() => {
    return { ...unref(paginationInfoRef) }
  })

  // 修改pageSize
  async function sizeChange (pageSize: number) {
    // 修改请求参数的pageSize
    paginationInfoRef.value.pageSize = pageSize
    paginationInfoRef.value.pageNum = 1
    // 请求表格数据
    await fetchTableData()
    // 处理当前页数据选中
    dealPageSelected()
  }
  // 修改pageNum
  async function currentChange (pageNum: number) {
    // 修改请求参数的pageNum
    paginationInfoRef.value.pageNum = pageNum
    // 请求表格数据
    await fetchTableData()
    // 处理当前页数据选中
    dealPageSelected()
  }
  return {
    getPaginationInfo,
    paginationInfoRef,
    sizeChange,
    currentChange
  }
}