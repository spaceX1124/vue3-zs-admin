<template>
  <div class="init-page">
    <div class="search-box">
      <Form @registerForm="registerForm" />
    </div>
    <div class="table-box">
      <Table @registerTable="registerTable"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Form, useForm } from '@/components/common/Form'
import { Table, useTable } from '@/components/common/Table'
import { Common } from '@/types'
interface PropsType {
  schemas: Common.BasicForm[] // 字段
}
const props = withDefaults(defineProps<PropsType>(), {})
// 搜索
const [registerForm] = useForm({
  schemas: props.schemas,
  labelPosition: 'right'
})
// 表格
const [registerTable] = useTable({
  schemas: props.schemas,
  async: {
    url: '/getTableData'
  }
})

</script>
<style lang="scss" scoped>
.init-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-box {
    flex: 1;
  }
}
</style>