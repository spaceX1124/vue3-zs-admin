<template>
  <div class="table-page">
    <Table @registerTable="registerTable"/>
  </div>
</template>
<script lang="ts" setup>
import { Table, useTable } from '@/components/common/Table'
import { schemas } from './main.ts'
const [registerTable] = useTable({
  schemas,
  async: {
    url: '/pageList'
  },
  openVirtual: true, // 我默认设置的是>=50条的时候开启虚拟滚动
  paginationInfo: {
    pageSize: 100,
    pageNum: 1
  },
  rowConfig: { height: 90 }// 开启虚拟表格一定要设置行高
})

</script>
<style lang="scss" scoped>
.table-page {
  padding: 16px 16px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>