import { defineStore } from "pinia";
import { ref } from "vue";
import { useDialogStore, useMessageStore } from "./";
import { ElMessageBox } from "element-plus";
import type { UserType } from "../types";

export const useUsersStore = defineStore("users", () => {
  // 開關對話框
  const { handleOpenDialog, handleCloseDialog } = useDialogStore();
  // 頂部訊息
  const { sendTopMessage } = useMessageStore();
  // ID生產器
  const generateID = () => crypto.randomUUID();

  const userData = ref<UserType[]>([]);

  // 模擬編輯的user資料
  const editUserData = ref<UserType>({
    id: "1",
    name: "Tom",
    email: "Tom@example.com",
  });

  const mockdData = (status = 200): Promise<UserType[]> => {
    const data = [
      {
        id: generateID(),
        name: "Tom",
        email: "Tom@example.com",
      },
      {
        id: generateID(),
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
  };

  // 模擬GET
  const getUserData = async () => {
    const res = await mockdData();
    userData.value = res;
  };

  // 模擬POST
  const postData = (user: UserType) => {
    userData.value.push(user);
  };

  // 元件外部接收新增使用者資料
  const addUser = (value: Omit<UserType, "id">): void => {
    postData({ id: generateID(), ...value });
    sendTopMessage("success", "新增成功");
    handleCloseDialog();
  };

  // 模擬PUT
  const findEditUser = (id: string) => {
    const user = userData.value.find((user) => user.id === id) as UserType;
    editUserData.value = user;
  };

  // 元件外部接收編輯使用者資料
  const editUser = (value: UserType) => {
    const userIndex = userData.value.findIndex((user) => user.id === value.id);
    userData.value[userIndex] = value;
    sendTopMessage("success", "修改成功");
    handleCloseDialog();
  };

  // 點擊根據id找尋user並開啟對話框
  const handleEditUser = (id: string) => {
    findEditUser(id);
    handleOpenDialog();
  };

  // 模擬DELETE
  const deleteUser = (id: string, name: string) => {
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
        const userIndex = userData.value.findIndex((user) => user.id === id);
        userData.value.splice(userIndex, 1);
        sendTopMessage("success", "刪除成功");
      })
      .catch(() => {
        sendTopMessage("info", "取消刪除");
      });
  };

  return {
    userData,
    editUserData,
    getUserData,
    addUser,
    editUser,
    handleEditUser,
    deleteUser,
  };
});
