<template>
  <Dialog
    v-model="show"
    :options="{
      width: options?.width
    }">
    <div style="padding: 12px">
      <Form @registerForm="registerForm"/>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from '@/components/common/Dialog/index.vue'
import { Form, useForm } from '@/components/common/Form'
import { Common } from '@/types'
interface propsType {
  modelValue: boolean;
  schemas: Common.BasicForm[],
  options?: {
    title?: string;
    width?: string;
  }
}
const props = withDefaults(defineProps<propsType>(), {
  modelValue: false
})
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get () {
    return props.modelValue
  },
  set (newVal) {
    emit('update:modelValue', newVal)
  }
})

const [registerForm] = useForm({
  schemas: props.schemas
  
})
</script>