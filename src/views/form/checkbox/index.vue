<template>
  <div class="form-content">
    <Form @registerForm="registerForm" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.ts'
const [registerForm] = useForm({
  schemas: unref(schemas),
  formData: {
    key1: [0, 1],
    key2: '2'
  }
})
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>