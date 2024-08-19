<template>
  <div class="form-content">
    <Form @registerForm="registerForm" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.ts'
// 不传baseColspan，开启grid响应式布局，
const [registerForm] = useForm({
  schemas: unref(schemas)
})
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>