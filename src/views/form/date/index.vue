<template>
  <div class="form-content">
    <Form @register="register" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.ts'
const [register] = useForm({
  schemas: unref(schemas),
  baseColspan: 8,
  formData: {
    key1: '2024'
  }
})
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>