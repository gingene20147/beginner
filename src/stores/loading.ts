import { defineStore } from "pinia";
import { ElLoading } from "element-plus";

export const useLoadingStore = defineStore("loading", {
  actions: {
    setLoading() {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
    },
  },
});
