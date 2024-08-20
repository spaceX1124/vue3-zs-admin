<template>
  <div>
    <div>
      <el-button type="primary" @click="open(1)">弹窗固定500px，一行展示1个</el-button>
      <el-button type="primary" @click="open(2)">弹窗固定600px，一行展示2个</el-button>
      <el-button type="primary" @click="open(3)">弹窗占比80%，元素宽度最小300px</el-button>
      <el-button type="primary" @click="open(4)">弹窗占比80%，元素宽度最小500px</el-button>
    </div>
    <Dialog
      v-model="visible"
      :options="{
        width: width
      }">
      <div style="padding: 16px" v-if="visible">
        <Form @registerForm="registerForm" />
      </div>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Dialog from '@/components/common/Dialog/index.vue'
import { Form, useForm } from '@/components/common/Form'
import { schemas } from './main.ts'
// Dialog 的内容是懒渲染的——在被第一次打开之前，传入的默认 slot 不会被立即渲染到 DOM 上。
// 因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。
// 在dialog没有弹出之前，form组件是没有加载的，所以这儿不生效,registerForm不会执行
// 因此，需要在nextTick回调中去执行setFormProps
// 当然也可以写很多个dialog，但是没必要，只是为了改变参数而已
const [registerForm, { setFormProps }] = useForm({
  schemas: unref(schemas)
})
const visible = ref(false)
const width = ref('')
function open(type: number) {
  visible.value = true
  switch (type) {
    case 1:
      width.value = '500px'
      nextTick(() => {
        setFormProps({
          openLayout: true,
          baseColspan: 24
        })
      })
      break
    case 2:
      width.value = '600px'
      nextTick(() => {
        setFormProps({
          openLayout: true,
          baseColspan: 12
        })
      })
      break
    case 3:
      width.value = '80%'
      // 计算方式是，假设80%占1000px，设置了最小宽度为300px，那么
      // 1000 / 300 ，一行只能放3个，此时元素的宽度是1000 / 3，每个元素的宽度平均分配的
      // 需要一行展示几个可自行根据设定容器的宽度去调整minmax的大小
      nextTick(() => {
        setFormProps({
          openGrid: true,
          gridTemplateColumns: 300
        })
      })
      break
    case 4:
      width.value = '80%'
      nextTick(() => {
        setFormProps({
          openGrid: true,
          gridTemplateColumns: 500
        })
      })
      break
  }
}
</script>
