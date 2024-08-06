import { defineStore } from "pinia";
import { ElMessage } from "element-plus";

type MessageType = "success" | "info" | "warning" | "error";

export const useMessageStore = defineStore("message", () => {
  const sendTopMessage = (type: MessageType, message: string) => {
    ElMessage({
      type,
      message,
    });
  };

  return { sendTopMessage };
});
