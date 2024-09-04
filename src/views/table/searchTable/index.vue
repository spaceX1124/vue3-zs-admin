<template>
  <InitPage
    ref="InitPageRef"
    :http="httpData"
    :schemas="pageList"
    :operateList="operateList"
    :add-options="{ width: '90%' }" />
</template>
<script lang="ts" setup>
import { InitPage, HttpType } from '@/components/business/InitPage'
import { getSchemas } from './main.ts'
import { productionList } from '@/api'
import { Common } from '@/types'
const httpData = ref<HttpType>({
  pageList: {
    url: productionList.pageList,
    method: 'get',
    data: {
      type: 1
    }
  },
  detail: {
    url: productionList.detail,
    method: 'get'
  }
})
const operateList = ref<Common.OperateType[]>([
  {
    buttonType: 'edit',
    title: '详情',
    type: 'primary'
  },
  {
    buttonType: 'edit',
    title: '详情',
    click () {
      console.log(123)
    }
  },
  {
    buttonType: 'delete',
    title: '删除',
    type: 'danger'
  }
])
const pageList = ref<Common.BasicForm[]>([])
const InitPageRef = ref(null)
onMounted(() => {
  pageList.value = getSchemas({ InitPageRef })
  console.log(pageList, 'pageList')
})

</script>
<style lang="scss" scoped></style>
