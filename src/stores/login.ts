import { defineStore } from "pinia";
import { useMessageStore } from "./message";
import { useLoadingStore } from "@/stores";
import { ElMessageBox } from "element-plus";

interface State {
  switchLogin: boolean;
  isLogin: boolean;
  loginData: {
    email: string;
    password: string;
    passwordConfirm?: string;
  } | null;
  user: {
    name: string;
    token: string;
  };
}

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const useLoginStore = defineStore("login", {
  state: (): State => ({
    switchLogin: true,
    isLogin: false,
    loginData: null,
    user: {
      name: "",
      token: "",
    },
  }),
  actions: {
    loginOrRegister() {
      this.switchLogin = !this.switchLogin;
    },
    login(value: State["loginData"]) {
      this.loginData = value;
      this.isLogin = true;
      localStorage.setItem(
        TOKEN_KEY,
        JSON.stringify({
          name: this.loginData!.email,
          token: "Bearer " + "eyxxxxxxxx",
        })
      );
      useLoadingStore().setLoading();
      useMessageStore().sendTopMessage("success", "登入成功 將為您轉到首頁");
    },
    register(value: State["loginData"]) {
      this.loginData = value;
      this.isLogin = true;
      localStorage.setItem(TOKEN_KEY, "Bearer " + "eyxxxxxxxx");
      useLoadingStore().setLoading();
      useMessageStore().sendTopMessage(
        "success",
        "註冊成功 將幫您登入並將為您轉到首頁"
      );
    },
    logout() {
      ElMessageBox.confirm(`您即將要登出，是否繼續?`, "登出", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.isLogin = false;
          this.user = { name: "", token: "" };
          localStorage.removeItem(TOKEN_KEY);
          useLoadingStore().setLoading();
          useMessageStore().sendTopMessage(
            "success",
            "登出成功 將為您轉到首頁"
          );
          location.replace(location.origin + "/");
          useMessageStore().sendTopMessage("success", "登出成功");
        })
        .catch(() => {
          useMessageStore().sendTopMessage("info", "取消登出");
        });
    },
    checkLogin(user: any) {
      this.user.name = user.name;
      this.user.token = user.token;
    },
  },
});
