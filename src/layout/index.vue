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
   height: 100vh;
   display: flex;
   background: #F5F6FA;
   &-aside {
    height: 100%;
    display: flex;
    flex-shrink: 0;
   }
   &-main {
     flex: 1;
     display: flex;
     flex-direction: column;
     overflow: hidden;
     &-header {
       height: 60px;
       background: #fff;
     }
     &-app {
       margin: 16px 16px 0 16px;
       background: #fff;
       //overflow-y: auto;
       flex: 1;
       display: flex;
       flex-direction: column;
     }
   }
 }
</style>
