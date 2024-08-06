<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  title: string;
  openMsg?: boolean;
  closeMsg: boolean;
  hideButton?: boolean;
  delay?: boolean;
}>();

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  // console.log("close");
  dialogVisible.value = false;
};

// 配合外部button的時候使用
watch(
  () => props.openMsg,
  () => {
    if (props.openMsg) {
      openDialog();
    }
  }
);

// 當外部傳遞關閉訊號時觸發
watch(
  () => props.closeMsg,
  () => {
    if (props.closeMsg) {
      closeDialog();
    }
  }
);
</script>

<template>
  <div>
    <el-button v-if="!hideButton" @click="openDialog" type="primary">{{
      title
    }}</el-button>
    <!-- destroy-on-close 屬性確保每次都是新的內容 -->
    <el-dialog v-model="dialogVisible" :title="title" destroy-on-close>
      <slot />
    </el-dialog>
  </div>
</template>

<style scoped></style>
