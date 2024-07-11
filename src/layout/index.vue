<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu router class="menu-box">
        <el-sub-menu index="2">
          <template #title>表单</template>
          <el-menu-item index="/form/input">Input</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>header</div>
      </el-header>
      <el-main class="main-box">
        <div class="main">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.layout-container {
  height: 100%;

  .menu-box {
    height: 100%;
  }
  .main-box {
    padding: 16px;
    background-color: #f4f4f5;
    .main {
      background: #fff;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
