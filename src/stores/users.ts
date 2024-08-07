import { defineStore } from "pinia";
import { useDialogStore, useMessageStore } from "./";
import { ElMessageBox } from "element-plus";
import type { UserType } from "../types";

interface State {
  userData: UserType[];
  editUserData: UserType | null;
  selectCity: "" | "台北市" | "台中市" | "高雄市" | "all";
}

export const useUsersStore = defineStore("users", {
  state: (): State => ({
    userData: [],
    editUserData: null,
    selectCity: "",
  }),
  actions: {
    generateID() {
      return crypto.randomUUID();
    },
    mockData(): UserType[] {
      return [
        {
          id: "1",
          date: "2023-01-10",
          name: "Alice",
          city: "台北市",
          email: "Alice@example.com",
        },
        {
          id: "2",
          date: "2023-02-14",
          name: "Bob",
          city: "台中市",
          email: "Bob@example.com",
        },
        {
          id: "3",
          date: "2023-03-20",
          name: "Charlie",
          city: "高雄市",
          email: "Charlie@example.com",
        },
        {
          id: "4",
          date: "2023-04-05",
          name: "David",
          city: "台北市",
          email: "David@example.com",
        },
        {
          id: "5",
          date: "2023-05-15",
          name: "Eva",
          city: "台中市",
          email: "Eva@example.com",
        },
        {
          id: "6",
          date: "2023-06-25",
          name: "Frank",
          city: "高雄市",
          email: "Frank@example.com",
        },
        {
          id: "7",
          date: "2023-07-30",
          name: "Grace",
          city: "台北市",
          email: "Grace@example.com",
        },
        {
          id: "8",
          date: "2023-08-12",
          name: "Hank",
          city: "台中市",
          email: "Hank@example.com",
        },
        {
          id: "9",
          date: "2023-09-18",
          name: "Ivy",
          city: "高雄市",
          email: "Ivy@example.com",
        },
        {
          id: "10",
          date: "2023-10-22",
          name: "Jack",
          city: "台北市",
          email: "Jack@example.com",
        },
      ];
    },
    // 模擬GET
    async getUserData() {
      const res = this.mockData();
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
  getters: {
    filterUser: (state) => {
      if (state.selectCity === "" || state.selectCity === "all") {
        return state.userData;
      } else {
        return state.userData.filter((user) => user.city === state.selectCity);
      }
    },
  },
});
