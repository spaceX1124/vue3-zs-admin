<template>
  <InitPage :http="httpData" :schemas="schemas" :add-options="{ width: '500px' }" a="111" />
</template>
<script lang="ts" setup>
import { InitPage, HttpType } from '@/components/business/InitPage'
import { schemas } from './main.ts'
const httpData = ref<HttpType>({
  pageList: '/pageList'
})
</script>
<style lang="scss" scoped></style>
