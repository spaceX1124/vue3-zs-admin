<template>
  <div class="form-content">
    <Form @register="register" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.tsx'
const [register] = useForm({
  schemas: unref(schemas),
  formData: {
    key1: '哈哈',
    key2: '解决'
  },
  baseColspan: {
    span: 4
  }
})
</script>
<style lang="scss" scoped>
.form-content {
  padding: 20px;
}
</style>