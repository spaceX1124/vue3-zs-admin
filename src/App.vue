<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
console.log(import.meta.env)
</script>
