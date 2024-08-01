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
    url: '/getTableData'
  }
})
</script>
<style lang="scss" scoped>
.table-page {
  height: 100%;
  padding: 16px;
}
</style>