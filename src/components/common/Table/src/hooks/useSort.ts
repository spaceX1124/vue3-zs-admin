import { Ref } from 'vue'

interface ActionType {
   fetchTableData: Global.PromiseFn;
   tableRequestParams: Ref<Global.Recordable>;
}

interface Result {
   sortChangeEvent: Global.PromiseFn;
}

export function useSort (actions: ActionType): Result {
  const { tableRequestParams, fetchTableData } = actions
  // 修改字段排序
  async function sortChangeEvent (e: any) {
    // 拿到当前排序字段
    const { field, order } = e
    // 处理请求参数
    if (!order) {
      delete tableRequestParams.value.sortData
    } else {
      tableRequestParams.value.sortData = { field, order }
    }
    // 重新请求表格数据
    await fetchTableData()
  }
  return {
    sortChangeEvent
  }
}