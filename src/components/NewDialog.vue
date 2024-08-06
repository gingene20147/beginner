<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  title: string;
  closeMsg: boolean;
  linkType?: boolean;
  delay?: boolean;
}>();

const dialogVisible = ref(false);

const openDialog = () => {
  if (!props.delay) {
    dialogVisible.value = true;
  } else {
    setTimeout(() => {
      dialogVisible.value = true;
    }, 0);
  }
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
    <el-button @click="openDialog" :link="linkType" type="primary">{{
      title
    }}</el-button>
    <el-dialog v-model="dialogVisible" top="30vh">
      <slot />
    </el-dialog>
  </div>
</template>

<style scoped></style>
