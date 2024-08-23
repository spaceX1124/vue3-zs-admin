<template>
  <div class="form-content">
    <div>
      <el-button @click="handleSubmit">提交</el-button>
    </div>
    <Form @registerForm="registerForm" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.tsx'
const [registerForm, { submit }] = useForm({
  schemas: unref(schemas),
  baseColspan: 6,
  openLayout: true
})
async function handleSubmit() {
  const data = await submit()
  console.log(data, 'data123')
}
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>
