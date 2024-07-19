<template>
  <div class="form-item-title">{{schema.title}}</div>
</template>
<script lang="ts" setup>
import { Common } from '@/types'

interface PropsType {
  schema: Common.BasicForm
}
withDefaults(defineProps<PropsType>(), {})

</script>
<style lang="scss" scoped>
.form-item-title {
  font-size: 15px;
  font-weight: 500;
}
</style>