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
import { isNullOrUndefOrEmpty } from '@/utils/is.ts'
interface propsType {
  modelValue: boolean;
  schemas: Common.BasicForm[],
  options?: {
    title?: string;
    width?: string;
    isEdit?: boolean;
    detailData?: Global.Recordable
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

const [registerForm, { setFieldsValue }] = useForm({
  schemas: props.schemas.filter((item) => !item.formHidden), // 过滤掉需要隐藏的字段
  openGrid: true,
  gridTemplateColumns: 400
})

watch(() => props.options?.detailData, (newVal) => {
  const arr = props.schemas.filter((item) => !item.formHidden)
  const obj: Global.Recordable = {}
  arr.forEach(item => {
    if (newVal && !isNullOrUndefOrEmpty(newVal[item.key])) {
      obj[item.key] = newVal[item.key]
    }
  })
  setFieldsValue(obj)
})
</script>