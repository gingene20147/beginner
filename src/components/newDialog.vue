<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  title: string;
  closeMsg: boolean;
}>();

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  console.log("close");
  dialogVisible.value = false;
};

watch(
  () => props.closeMsg,
  () => {
    closeDialog();
  }
);
</script>

<template>
  <div>
    <el-button @click="openDialog">{{ title }}</el-button>
    <el-dialog v-model="dialogVisible"> <slot /> </el-dialog>
  </div>
</template>

<style scoped></style>
