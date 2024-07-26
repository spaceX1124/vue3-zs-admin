<template>
  <el-menu
    class="custom-el-menu"
    @select="select"
    background-color="#484A7C"
    text-color="#C2C3E6"
    active-text-color="#fff"
  >
    <SubMenu :menuList="menuList"/>
  </el-menu>
</template>

<script lang="ts" setup>
import SubMenu from '../subMenu/index.vue'
import { mainUser } from '@/store'
import router from '@/router'
const mainUserStore = mainUser()
const menuList = computed(() => {
  return mainUserStore.menuList
})

function select (name: string) {
  router.push({ name })
}
</script>

<style scoped lang="scss">
.custom-el-menu {
  flex: 1;
  overflow: auto;
  :deep(.el-menu-item) {
    &.is-active {
      background: rgba(140,127,168, .2);
      position: relative;
      &:after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: $primary-color5;
      }
    }
  }
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title{
        color: #fff;
      }
    }
  }
}
</style>
