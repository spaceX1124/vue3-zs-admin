<template>
  <template v-for="item in menuList" :key="item.id">
    <el-sub-menu v-if="item && item.children && item.children.length" :index="item.name">
      <template #title>
        <div>
          <span :class="`iconfont ${item.icon}`"/>
        </div>
        <div class="menuStyle">
          {{ item?.title }}
        </div>
      </template>
      <Submenu :menu-list="item.children"/>
    </el-sub-menu>

    <el-menu-item v-else :index="item.name">{{ item?.title }}</el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import Submenu from './index.vue'
import { Business } from '@/types'

type Props = {
  menuList: Business.MenuItem[];
};
withDefaults(defineProps<Props>(), {
  menuList: () => []
})

</script>

<style scoped lang="scss">
.menuStyle {
  display: flex;
  align-items: center;
  margin-left: 8px;
  > img {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
}
</style>
