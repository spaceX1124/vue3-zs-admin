<template>
  <el-dialog
    class="myDialog"
    v-model="show"
    :width="options?.width || '400px'"
    :close-on-click-modal="false"
    :show-close="false">
    <template #header>
      <div class="title">
        <div class="title-text">{{ options?.title || '标题' }}</div>
        <span @click="close" class="pointer icon iconfont icon-a-icon-close" />
      </div>
    </template>
    <slot />
    <template #footer>
      <slot name="footer">
        <div class="footer">
          <slot name="footerLeft" />
          <div>
            <el-button @click="close">{{ options?.cancelTxt || '取消' }}</el-button>
            <el-button :loading="loading" type="primary" @click="sure">{{ options?.sureTxt || '确认' }}
            </el-button>
          </div>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
interface PropsType {
  modelValue: boolean;
  options?: {
    title?: string;
    width?: string;
    cancelTxt?: string;
    sureTxt?: string;
    isLoading?: boolean; // 点击确定按钮时是否需要开启loading
  }
}
const props = withDefaults(defineProps<PropsType>(), {
  modelValue: false
})

const emit = defineEmits(['update:modelValue', 'sure', 'close'])
const loading = ref(false)
const show = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emit('update:modelValue', val)
  }
})
function close () {
  show.value = false
  loading.value = false
  emit('close')
}
function sure () {
  if (props.options?.isLoading) {
    loading.value = true
    emit('sure', () => {
      loading.value = false
    })
  } else {
    emit('sure')
  }
}

</script>
<style lang="scss">
.myDialog {
  padding: 0!important;
  margin: 10vh auto;
  .el-dialog__header {
    padding: 0;
    margin: 0;
    background: linear-gradient( 180deg, rgba(194,195,230,0.5) 0%, #FFFFFF 100%);
    border-radius: 8px 8px 0 0;
  }
  .el-dialog__footer {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
    height: calc(100vh - 20vh - 48px - 64px);
    overflow-y: auto;
  }
}
</style>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 20px;

  .title-text {
    font-size: 18px;
    font-weight: 600;
    color: $primary-color2;
  }

  span {
    font-size: 13px;
    color: $primary-color3;
  }
}

.footer {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>