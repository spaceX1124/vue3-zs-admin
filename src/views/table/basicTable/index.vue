<template>
  <div class="table-page">
    <div style="height: 40px">
      <el-button type="primary" @click="empty">空数据</el-button>
      <el-button type="primary" @click="fetch">请求数据</el-button>
      <el-button type="primary" @click="alignHeader('left')">表头左对齐</el-button>
      <el-button type="primary" @click="alignHeader('center')">表头居中</el-button>
      <el-button type="primary" @click="alignHeader('right')">表头右对齐</el-button>
      <el-button type="primary" @click="alignContent('left')">内容左对齐</el-button>
      <el-button type="primary" @click="alignContent('center')">内容居中</el-button>
      <el-button type="primary" @click="alignContent('right')">内容右对齐</el-button>
    </div>
    <Table @registerTable="registerTable" />
  </div>
</template>
<script lang="ts" setup>
import { Table, useTable } from '@/components/common/Table'
import { schemas } from './main.ts'
const [registerTable, { setTableProps, fetchTableData }] = useTable({
  schemas,
  async: {
    url: '/pageList'
  }
})
function empty() {
  setTableProps({
    tableData: []
  })
}
function fetch() {
  fetchTableData()
}
function alignHeader(align: 'left' | 'center' | 'right') {
  setTableProps({
    headerAlign: align
  })
}
function alignContent(align: 'left' | 'center' | 'right') {
  setTableProps({
    align
  })
}
</script>
<style lang="scss" scoped>
.table-page {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
