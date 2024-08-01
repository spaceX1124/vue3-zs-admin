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
  baseColspan: 8
})
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>