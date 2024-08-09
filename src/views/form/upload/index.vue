<template>
  <div class="select-content">
    <Form @registerForm="registerForm" />
  </div>
</template>
<script lang="tsx" setup>
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.ts'
const [registerForm] = useForm({
  schemas: schemas
})
</script>
<style lang="scss" scoped>
.select-content {
  padding: 20px;
}
</style>