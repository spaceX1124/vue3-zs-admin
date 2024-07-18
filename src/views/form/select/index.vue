<template>
  <div class="select-content">
    <Form @register="register" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.ts'
const [register] = useForm({
  schemas: schemas,
  formData: {
    key1: 0,
    key3: 2
  }
})
</script>
<style lang="scss" scoped>
.select-content {
  padding: 20px;
}
</style>