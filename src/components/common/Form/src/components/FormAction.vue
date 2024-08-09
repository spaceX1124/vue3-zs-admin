<template>
  <div class="search-btn-box">
    <el-button type="primary" @click="handleSubmit">搜索</el-button>
    <el-button @click="handleClear">清空</el-button>
  </div>
</template>
<script lang="ts" setup>
interface PropsType {
  submit: () => void;
  clear: () => void;
}
const props = defineProps<PropsType>()
function handleSubmit () {
  props.submit()
}
function handleClear () {
  props.clear()
}
</script>
<style lang="scss" scoped>
.search-btn-box {
  text-align: right;
}
</style>