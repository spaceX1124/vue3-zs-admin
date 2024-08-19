<template>
  <div class="search-btn-box">
    <el-button type="primary" @click="handleSubmit">搜索</el-button>
    <el-button @click="handleClear">清空</el-button>
    <el-button type="primary" text @click="handleExpand">{{expand ? '展开' : '收起'}}
      <el-icon :size="14">
        <ArrowDown v-show="expand"/>
        <ArrowUp v-show="!expand"/>
      </el-icon>
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
const emit = defineEmits(['submit', 'clear', 'expand'])
function handleSubmit () {
  emit('submit')
}
function handleClear () {
  emit('clear')
}
const expand = ref(true)
function handleExpand () {
  expand.value = !unref(expand)
  emit('expand', expand.value)
}

</script>
<style lang="scss" scoped>
.search-btn-box {
  text-align: right;
  margin-left: 12px;
}
</style>