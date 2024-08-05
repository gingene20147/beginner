<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import NewDialog from "./NewDialog.vue";
import AddForm from "./AddForm.vue";
import EditForm from "./EditForm.vue";

type DataType = {
  id: string;
  name: string;
  email: string;
};

// 模擬抓取資料的容器
const tableData = ref<DataType[]>([]);
// 模擬編輯的user資料
const tempUser = ref<DataType>();
// 傳遞關閉對話框的訊息
const closeDialogMsg = ref(false);

// ID生產器
const generateID = () => {
  return crypto.randomUUID();
};

// 模擬GET
const getData = () => {
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

  tableData.value = data;
};

const postData = async (user: DataType) => {
  tableData.value.push(user);
};

const findEditUser = (id: string) => {
  const user = tableData.value.find((user) => user.id === id);
  tempUser.value = user;
};

// 模擬POST
const addUser = (value: Omit<DataType, "id">): void => {
  postData({ id: generateID(), ...value });
  handleCloseDialog();
};

// 模擬PUT
const editUser = (value: DataType) => {
  const userIndex = tableData.value.findIndex((user) => user.id === value.id);
  tableData.value[userIndex] = value;
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
      const userIndex = tableData.value.findIndex((user) => user.id === id);
      tableData.value.splice(userIndex, 1);

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

const handleCloseDialog = (): void => {
  closeDialogMsg.value = true;
  setTimeout(() => {
    closeDialogMsg.value = false;
  }, 50);
};

onMounted(() => {
  getData();
});
</script>

<template>
  <el-table :data="tableData" style="width: 100%" class="mb-4">
    <el-table-column prop="id" label="ID" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="email" label="Email" width="180" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <div class="flex">
          <NewDialog
            title="編輯"
            :closeMsg="closeDialogMsg"
            :linkType="true"
            :delay="true"
            @click="findEditUser(scope.row.id)"
          >
            <EditForm :user="tempUser" @editUser="editUser" />
          </NewDialog>

          <el-button
            link
            type="danger"
            size="small"
            @click="deleteUser(scope.row.id, scope.row.name)"
            >刪除</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
  <NewDialog title="新增使用者資料" :closeMsg="closeDialogMsg">
    <AddForm @addUser="addUser" />
  </NewDialog>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}

.flex {
  display: flex;
}
</style>
