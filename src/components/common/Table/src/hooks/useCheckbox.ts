import { ComputedRef } from 'vue'

interface ActionType {
  VxeTableRef: Ref<any>;
  getTableData: ComputedRef<Global.Recordable[]>
}

export function useCheckbox (actions: ActionType) {
  const { VxeTableRef, getTableData } = actions
  // 所有选中的数据Map
  const selectedDataMap = ref<Map<string, Global.Recordable>>(new Map())

  // 处理单个数据选中或取消选中
  function dealSingleCheckbox (row: Global.Recordable) {
    const id = row.id
    if (selectedDataMap.value.has(id)) {
      // 如果数据已选中，从 Map 中移除
      selectedDataMap.value.delete(id)
    } else {
      // 如果数据未选中，添加到 Map 中
      selectedDataMap.value.set(id, row)
    }
  }

  // 计算属性来获取选中的数据列表
  const selectedData = computed(() => {
    return Array.from(selectedDataMap.value.values())
  })

  // 处理当前页面所有选中数据的回显
  function dealPageSelected () {
    const $table = VxeTableRef.value
    if ($table) {
      const allData = $table.getTableData().fullData
      const rowsToSelect = allData.filter((row: Global.Recordable) => selectedDataMap.value.has(row.id))
      $table.setCheckboxRow(rowsToSelect, true)
    }
  }

  // 选中当前行数据
  function toggleCheckboxEvent (row: Global.Recordable) {
    const $table = VxeTableRef.value
    // 这儿只是处理表格页面样式的选中或取消选中
    if ($table) {
      $table.toggleCheckboxRow(row)
    }
    // 处理选中或取消数据的存储
    dealSingleCheckbox(row)
  }
  // 选中当前页所有数据，或者取消全选
  function selectAllEvent (checked: string | number | boolean) {
    const $table = VxeTableRef.value
    if ($table) {
      // 处理当前页全部选中或全部取消选中
      $table.setAllCheckboxRow(!!checked)
      // 全选存储和取消存储
      unref(getTableData).forEach(data => {
        if (selectedDataMap.value.has(data.id)) {
          selectedDataMap.value.delete(data.id)
        } else {
          selectedDataMap.value.set(data.id, data)
        }
      })
    }
  }
  // 清空所有数据选中
  function clearAllCheckbox () {
    const $table = VxeTableRef.value
    if ($table) {
      // 将当前页所有选中取消
      $table.clearCheckboxRow()
      // 清空所有保存的选中数据
      selectedDataMap.value.clear()
    }
  }
  return {
    selectedData,
    selectedDataMap,
    dealPageSelected,
    toggleCheckboxEvent,
    selectAllEvent,
    clearAllCheckbox
  }
}