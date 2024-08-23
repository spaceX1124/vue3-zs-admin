<template>
  <div>订阅姓名：{{ name }}</div>
  <div>订阅爱好：{{  }}</div>
</template>
<script lang="ts" setup>
import EventEmitter from '@/utils/eventEmitter'

let name = ref('张三')
EventEmitter.on('event1', (params1) => {
  name.value = params1
})

let hobby
EventEmitter.on('event2', () => {

})
</script>
