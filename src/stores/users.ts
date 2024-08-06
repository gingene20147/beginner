import { defineStore } from "pinia";
import { useDialogStore, useMessageStore } from "./";
import { ElMessageBox } from "element-plus";
import type { UserType } from "../types";

interface State {
  userData: UserType[];
  editUserData: UserType | null;
}

export const useUsersStore = defineStore("users", {
  state: (): State => ({
    userData: [],
    editUserData: null,
  }),
  actions: {
    generateID() {
      return crypto.randomUUID();
    },
    mockdData(status = 200): Promise<UserType[]> {
      const data = [
        {
          id: this.generateID(),
          name: "Tom",
          email: "Tom@example.com",
        },
        {
          id: this.generateID(),
          name: "Amy",
          email: "Amy@example.com",
        },
      ];
      return new Promise((resolve, reject) => {
        if (status === 200) {
          resolve(data);
        } else {
          reject("errors");
        }
      });
    },
    // 模擬GET
    async getUserData() {
      const res = await this.mockdData();
      this.userData = res;
    },
    // 模擬POST
    postData(user: UserType) {
      this.userData.push(user);
    },
    // 元件外部接收新增使用者資料(配合emit)
    addUser(value: Omit<UserType, "id">) {
      this.postData({ id: this.generateID(), ...value });
      useMessageStore().sendTopMessage("success", "新增成功");
      useDialogStore().handleCloseDialog();
    },
    // 模擬PUT
    findEditUser(id: string) {
      const user = this.userData.find((user) => user.id === id) as UserType;
      this.editUserData = user;
    },
    // 元件外部接收編輯使用者資料(配合emit)
    editUser(value: UserType) {
      const userIndex = this.userData.findIndex((user) => user.id === value.id);
      this.userData[userIndex] = value;
      useMessageStore().sendTopMessage("success", "修改成功");
      useDialogStore().handleCloseDialog();
    },
    // 點擊根據id找尋user並開啟對話框
    handleEditUser(id: string) {
      this.findEditUser(id);
      useDialogStore().handleOpenDialog();
    },
    // 模擬DELETE
    deleteUser(id: string, name: string) {
      ElMessageBox.confirm(
        `即將要刪除使用者${name}資料，是否繼續?`,
        "您正要嘗試刪除一位使用者",
        {
          confirmButtonText: "刪除",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const userIndex = this.userData.findIndex((user) => user.id === id);
          this.userData.splice(userIndex, 1);
          useMessageStore().sendTopMessage("success", "刪除成功");
        })
        .catch(() => {
          useMessageStore().sendTopMessage("info", "取消刪除");
        });
    },
  },
});
