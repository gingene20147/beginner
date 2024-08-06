import { defineStore } from "pinia";
import { ref, nextTick } from "vue";

export const useDialogStore = defineStore("dialog", () => {
  // 傳遞開啟對話框的訊息
  const openDialogMsg = ref(false);

  const handleOpenDialog = () => {
    openDialogMsg.value = true;
    nextTick(() => {
      openDialogMsg.value = false;
    });
  };

  // 傳遞關閉對話框的訊息
  const closeDialogMsg = ref(false);

  const handleCloseDialog = (): void => {
    closeDialogMsg.value = true;
    nextTick(() => {
      closeDialogMsg.value = false;
    });
  };

  return { openDialogMsg, closeDialogMsg, handleOpenDialog, handleCloseDialog };
});
