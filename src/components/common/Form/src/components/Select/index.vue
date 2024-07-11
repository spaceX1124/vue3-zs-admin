<template>
  <div>输入框</div>
</template>

<script lang="ts">
export type SelectEmitsType = {
  clear?: () => void;
}
</script>

<script lang="ts" setup>
interface PropsType {
  multiple: boolean;
}
const props = withDefaults(defineProps<PropsType>(), {
  multiple: false
})
</script>