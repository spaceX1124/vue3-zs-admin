<template>
  <div class="init-page">
    <!-- 快捷搜索 -->
    <SearchForm
      :schemas="schemas"
      v-if="!hiddenSearch"
      @clearForm="clearForm"
      @search="search"/>
    <!-- 按钮操作区域 -->
    <div class="operate-wrapper">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <!-- 表格 -->
    <Table @registerTable="registerTable"/>
    <!-- 新增，编辑弹窗 -->
    <AddForm
      v-if="addVisible"
      v-model="addVisible"
      :schemas="schemas"
      :options="{
        width: addOptions && addOptions?.width,
        isEdit: isEdit,
        detailData: detailData
      }"/>
  </div>
</template>
<script setup lang="ts">
import { Table, useTable } from '@/components/common/Table'
import { AddForm } from '@/components/common/AddForm'
import { SearchForm } from '@/components/common/searchForm'
import { Common } from '@/types'
import { HttpType } from './types'
import { http as httpFn } from '@/utils/http'
interface PropsType {
  schemas: Common.BasicForm[] // 字段
  http: HttpType,
  addOptions?: { // 新增表单弹窗样式
    width?: string;
    title?: string;
  },
  hiddenSearch?: boolean, // 是否隐藏搜索区域
  operateList?: Common.OperateType[]
}
const props = withDefaults(defineProps<PropsType>(), {
  hiddenSearch: false
})

const [registerTable, { fetchTableData, refreshSearchRequestParams, clearSearchRequestParams, setTableProps }] = useTable({
  async: props.http.pageList,
  schemas: props.schemas,
  align: 'center',
  operateList: props.operateList,
  editCallback (data) {
    handleEdit(data)
  }
})

watch(() => props.schemas, (newVal) => {
  setTableProps({
    schemas: newVal
  })
})

// 新增表单
const addVisible = ref(false)
const isEdit = ref(false)
const detailData = ref<Global.Recordable>({})
// 执行新增
function handleAdd (){
  isEdit.value = false
  addVisible.value = true
  detailData.value = {}
}
// 执行编辑
function handleEdit (params: Global.Recordable) {
  if (!props.http.detail) return
  isEdit.value = true
  addVisible.value = true
  const { method, url, data } = props.http.detail
  httpFn[method](url, { ...data, ...params }).then(res => {
    detailData.value = res
  })
}

// 清空搜索字段，刷新表格数据
function clearForm () {
  // 清空快捷搜索字段参数
  clearSearchRequestParams()
  // 刷新表格数据
  fetchTableData()
}
// 点击搜索
function search (data: Global.Recordable) {
  // 设置表格搜索条件
  refreshSearchRequestParams(data)
  // 刷新表格数据
  fetchTableData()
}

defineExpose({
  fetchTableData // 刷新表格数据
})

</script>
<style lang="scss" scoped>
.init-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  .operate-wrapper {
    margin: 12px 0;
  }
  .table-box {
    flex: 1;
  }
}
</style>