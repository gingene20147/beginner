import { defineStore } from "pinia";
import { ref, nextTick } from "vue";

export const useDialogStore = defineStore("dialog", () => {
  // 傳遞關閉對話框的訊息
  const closeDialogMsg = ref(false);

  const handleCloseDialog = (): void => {
    closeDialogMsg.value = true;
    nextTick(() => {
      closeDialogMsg.value = false;
    });
  };

  return { closeDialogMsg, handleCloseDialog };
});
