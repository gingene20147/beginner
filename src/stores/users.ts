import { defineStore } from "pinia";
import { ref } from "vue";
import { useDialogStore } from "./dialog";
import { ElMessageBox, ElMessage } from "element-plus";
import type { UserType } from "../types";

export const useUsersStore = defineStore("users", () => {
  const { handleCloseDialog } = useDialogStore();
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
  const addUser = (value: Omit<UserType, "id">): void => {
    postData({ id: generateID(), ...value });
    handleCloseDialog();
  };

  // 模擬PUT
  const findEditUser = (id: string) => {
    const user = userData.value.find((user) => user.id === id) as UserType;
    editUserData.value = user;
  };

  const editUser = (value: UserType) => {
    const userIndex = userData.value.findIndex((user) => user.id === value.id);
    userData.value[userIndex] = value;
    handleCloseDialog();
  };

  // 模擬DELETE
  const deleteUser = (id: string, name: string) => {
    ElMessageBox.confirm(`即將要刪除使用者${name}資料，是否繼續?`, "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(() => {
        const userIndex = userData.value.findIndex((user) => user.id === id);
        userData.value.splice(userIndex, 1);

        ElMessage({
          type: "success",
          message: "刪除成功",
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消刪除",
        });
      });
  };

  return {
    userData,
    editUserData,
    getUserData,
    addUser,
    findEditUser,
    editUser,
    deleteUser,
  };
});
