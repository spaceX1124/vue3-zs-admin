<template>
  <div class="search-container" :class="{'expand-search-container': !expandStatus}">
    <div class="search-form">
      <Form @registerForm="registerForm"/>
    </div>
    <FormAction @submit="handleSearch" @clear="clearForm" @expand="expand"/>
  </div>
</template>
<script lang="ts" setup>
import { Form, useForm } from '@/components/common/Form'
import { Common } from '@/types'
import FormAction from './components/FormAction.vue'

interface PropsType {
  schemas: Common.BasicForm[]
}
const props = withDefaults(defineProps<PropsType>(), {})
const [registerForm, { clearFormValues, submit }] = useForm({
  schemas: props.schemas,
  labelPosition: 'right'
})
// 清空表单
function clearForm () {
  clearFormValues()
}
// 点击搜索
async function handleSearch () {
  const postData = await submit()
  console.log(postData, 'postData123')
}
// 折叠状态
let expandStatus = ref(true)
// 展开，折叠
function expand (val: boolean) {
  console.log(val, 'val')
  expandStatus.value = val
}

</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  background: #f8f8fa;
  padding: 16px 16px 0 16px;
  overflow: hidden;
  height: 64px;
  &.expand-search-container {
    height: auto;
  }
  .search-form {
    flex: 1;
    :deep(.el-form) {
      .el-form-item {
        margin-bottom: 16px;
      }
    }
  }
}
</style>