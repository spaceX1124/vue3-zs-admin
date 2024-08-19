<template>
  <div class="table-page">
    <div style="height: 40px">
      <el-button type="primary" @click="getSelection">获取选中项数据</el-button>
      <el-button type="primary" @click="clearAll">清空所有选中项</el-button>
    </div>
    <Table @registerTable="registerTable" />
  </div>
</template>
<script lang="ts" setup>
import { Table, useTable } from '@/components/common/Table'
import { schemas } from './main.ts'
import { ElMessage } from 'element-plus'
const [registerTable, { getSelectRecords, clearAllCheckbox }] = useTable({
  schemas,
  async: {
    url: '/pageList'
  },
  openCheckbox: true
})
function getSelection() {
  let list = getSelectRecords()
  console.log(list, '选中数据')
  ElMessage.info('数据看控制台')
}
function clearAll() {
  clearAllCheckbox()
  ElMessage.success('全部清空了')
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
