import { defineStore } from "pinia";
import { nextTick } from "vue";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    openDialogMsg: false,
    closeDialogMsg: false,
  }),
  actions: {
    // 傳遞開啟對話框的訊息
    handleOpenDialog() {
      this.openDialogMsg = true;
      nextTick(() => {
        this.openDialogMsg = false;
      });
    },
    // 傳遞關閉對話框的訊息
    handleCloseDialog() {
      this.closeDialogMsg = true;
      nextTick(() => {
        this.closeDialogMsg = false;
      });
    },
  },
});
