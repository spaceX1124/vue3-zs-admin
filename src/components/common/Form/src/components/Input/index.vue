<template>
  <div>下拉框</div>
</template>

<script lang="ts">
export type InputEmitsType = {
  blur?: (innerValue?: string) => void;
  focus?: (innerValue?: string) => void;
  input?: (innerValue?: string) => void;
  clear?: () => void;
}
</script>

<script lang="ts" setup>
interface PropsType {
  type: 'text' | 'textarea';
}
const props = withDefaults(defineProps<PropsType>(), {
  type: 'text'
})
</script>