<template>
  <el-button @click="handleEvent">发布姓名，张三变李四</el-button>
</template>
<script lang="ts" setup>
import EventEmitter from '@/utils/eventEmitter'
function handleEvent() {
  EventEmitter.emit('event1', '李四')
}
</script>
