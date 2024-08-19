<template>
  <div class="init-page">
    <!-- 快捷搜索 -->
    <SearchForm :schemas="schemas"
                v-if="!hiddenSearch"
                @clearForm="clearForm"
                @search="search"/>
    <!-- 操作区域 -->
    <div class="operate-wrapper">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <!-- 表格 -->
    <Table @registerTable="registerTable"/>
    <!-- 新增，编辑 -->
    <AddForm v-if="addVisible"
             v-model="addVisible"
             :schemas="schemas"
             :options="{
               width: addOptions?.width
             }"/>
  </div>
</template>
<script setup lang="ts">
import { Table, useTable } from '@/components/common/Table'
import { AddForm } from '@/components/common/AddForm'
import { SearchForm } from '@/components/common/searchForm'
import { Common } from '@/types'
import { isString } from '@/utils/is.ts'
import { HttpType } from './types'
interface PropsType {
  schemas: Common.BasicForm[] // 字段
  http: HttpType,
  addOptions?: { // 新增表单弹窗样式
    width?: string;
    title?: string;
  },
  hiddenSearch?: boolean // 是否隐藏搜索区域
}
const props = withDefaults(defineProps<PropsType>(), {
  hiddenSearch: false
})

// 表格初始化
const async = isString(props.http.pageList)
  ? { url: props.http.pageList, method: 'post', data: {} }
  : { url: props.http.pageList.url, method: props.http.pageList.method || 'post', data: props.http.pageList.data || {} }
const [registerTable, { fetchTableData, refreshSearchRequestParams, clearSearchRequestParams }] = useTable({
  async,
  schemas: props.schemas
})

// 新增表单
const addVisible = ref(false)
function handleAdd (){
  addVisible.value = true
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