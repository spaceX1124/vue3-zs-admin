import { BasicTableProps, TableActionType } from '../types/table.ts'

/**
 * 入口函数
 * @param {tableProps} tableProps 接受一个对象，对象参数可可控制表格的一些能力，也是使用表格的参数入口
 * @return {[() => void, TableActionType]}
 * */
export function useTable (tableProps?: BasicTableProps): [(tableAction: TableActionType) => void, TableActionType] {
  // 存储表格中定义的方法
  const tableActionRef = ref<TableActionType>()
  // 初始化方法，方便在外部使用
  function registerTable (tableAction: TableActionType) {
    tableActionRef.value = tableAction
    tableProps && tableAction.setProps(tableProps)
  }
  // 暴露给外部使用的一些方法，当我们在外部调用下面的方法的时候，实际上是调用tableActionRef中的方法，也就是VTable/index.vue中tableAction中的方法
  const methods:TableActionType = {
    setProps: (tableProps:BasicTableProps) => {
      tableActionRef.value?.setProps(tableProps)
    },
    setLoading: (loading:boolean) => {
      tableActionRef.value?.setLoading(loading)
    }
  }

  return [registerTable, methods]
}