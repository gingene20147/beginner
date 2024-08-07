<script setup lang="ts">
import HeaderNav from "@/layout/HeaderNav.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderNav></HeaderNav>
      </el-header>

      <slot name="title"></slot>

      <el-main>
        <slot name="main"></slot>
      </el-main>
      <slot></slot>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
