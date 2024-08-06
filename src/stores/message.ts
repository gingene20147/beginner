import { defineStore } from "pinia";
import { ElMessage } from "element-plus";

type MessageType = "success" | "info" | "warning" | "error";

export const useMessageStore = defineStore("message", {
  actions: {
    // 發送頂部訊息
    sendTopMessage(type: MessageType, message: string) {
      ElMessage({
        type,
        message,
      });
    },
  },
});
