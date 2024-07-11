<template>
  <el-col :span="24">
    <EButton @click="handleSubmit">提交</EButton>
  </el-col>
</template>
<script lang="ts" setup>
interface PropsType {
  submit: () => void
}
const props = defineProps<PropsType>()
function handleSubmit () {
  props.submit()
}
</script>