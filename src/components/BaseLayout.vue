<script setup lang="ts"></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <slot name="main"></slot>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
