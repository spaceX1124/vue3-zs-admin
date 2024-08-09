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
  sortConfig: {
    remote: true
  }
})
</script>
<style lang="scss" scoped>
.table-page {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>