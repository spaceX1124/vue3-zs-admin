import { ComputedRef } from 'vue'
import type { BasicTableProps, PaginationInfo } from '../types/table.ts'

interface Result {
    getPaginationInfo: ComputedRef<PaginationInfo>
}
/**
 * 处理分页数据
 * @param {ComputedRef<BasicTableProps>} innerProps 通过useTable传入的一些参数
 * @return {Result} 需要暴露给外面的一些数据和方法
 * */
export function usePagination (innerProps:ComputedRef<BasicTableProps>): Result {
  // 分页信息
  const paginationInfoRef = ref<PaginationInfo>(unref(innerProps).paginationInfo || {
    pageNum: 1,
    pageSize: 10
  })

  // 获取当前分页信息
  const getPaginationInfo = computed(() => {
    return { ...unref(paginationInfoRef) }
  })
  return {
    getPaginationInfo
  }
}