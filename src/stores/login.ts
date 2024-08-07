import { defineStore } from "pinia";
import { useMessageStore } from "./message";
import { useLoadingStore } from "@/stores";

interface State {
  switchLogin: boolean;
  isLogin: boolean;
  loginData: {
    email: string;
    password: string;
    passwordConfirm?: string;
  } | null;
}

export const useLoginStore = defineStore("login", {
  state: (): State => ({
    switchLogin: true,
    isLogin: false,
    loginData: null,
  }),
  actions: {
    loginOrRegister() {
      this.switchLogin = !this.switchLogin;
    },
    login(value: State["loginData"]) {
      this.loginData = value;
      this.isLogin = true;
      useLoadingStore().setLoading();
      useMessageStore().sendTopMessage("success", "登入成功 將為您轉到首頁");
      // useRouter().push("/");
    },
    register(value: State["loginData"]) {
      this.loginData = value;
      this.isLogin = true;
      useLoadingStore().setLoading();
      useMessageStore().sendTopMessage(
        "success",
        "註冊成功 將幫您登入並將為您轉到首頁"
      );
    },
  },
});
