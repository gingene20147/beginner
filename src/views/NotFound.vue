<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
console.log(router);

const goBack = () => {
  router.back();
};
</script>

<template>
  <el-result title="404" sub-title="Sorry, request error">
    <template #icon>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="goBack">Back</el-button>
    </template>
  </el-result>
</template>

<style scoped></style>
