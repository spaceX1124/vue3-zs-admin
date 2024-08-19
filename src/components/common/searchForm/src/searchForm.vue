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
import { isNullOrUndefOrEmpty } from '@/utils/is'

interface PropsType {
  schemas: Common.BasicForm[]
}
const props = withDefaults(defineProps<PropsType>(), {})
const emit = defineEmits(['clearForm', 'search'])
const [registerForm, { clearFormValues, submit }] = useForm({
  schemas: props.schemas.filter(item => item.search), // 只取可搜索字段
  labelPosition: 'right'
})
// 清空表单
function clearForm () {
  clearFormValues()
  emit('clearForm')
}
// 点击搜索
async function handleSearch () {
  const postData = await submit()
  // 过滤掉无空值的字段
  const arr = Object.entries(postData || {}).filter(([key, value]) => !isNullOrUndefOrEmpty(value))
  emit('search', Object.fromEntries(arr))
}
// 折叠状态
let expandStatus = ref(true)
// 展开，折叠
function expand (val: boolean) {
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