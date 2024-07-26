<template>
  <div class="layout">
    <div class="layout-aside" :style="{'width': '224px'}">
      <Menu/>
    </div>
    <div class="layout-main">
      <div class="layout-main-header">
        header
      </div>
      <div class="layout-main-app">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './menu/index.vue'
</script>
<style lang="scss" scoped>
 .layout {
   width: 100%;
   height: 100vh;
   display: flex;
   background: #F5F6FA;
   overflow: hidden;
   &-aside {
    height: 100%;
     display: flex;
   }
   &-main {
     flex: 1;
     display: flex;
     flex-direction: column;
     &-header {
       height: 60px;
       background: #fff;
     }
     &-app {
       flex: 1;
       margin: 16px 16px 0 16px;
       background: #fff;
       overflow: auto;
     }
   }
 }
</style>
