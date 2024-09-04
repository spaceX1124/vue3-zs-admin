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
  formData: {
    key1: '哈哈',
    key2: '解决'
  },
  baseColspan: 6,
  openLayout: true
})
function handleSubmit () {
  submit()
}
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>
