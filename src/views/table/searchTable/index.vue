<template>
  <div class="table-page">
    <Table @registerTable="registerTable" :schemas="schemas"/>
  </div>
</template>
<script lang="ts" setup>
import { Table, useTable } from '@/components/common/Table'
import { schemas } from './main.ts'
const [registerTable] = useTable({
  async: {
    url: '/pageList'
  },
  showOperate: true,
  showSearch: true
})
</script>
<style lang="scss" scoped>
.table-page {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>