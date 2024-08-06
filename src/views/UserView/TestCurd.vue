<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import NewDialog from "./NewDialog.vue";
import AddForm from "./AddForm.vue";
import EditForm from "./EditForm.vue";
import type { UserType } from "@/types";

import { useUsersStore, useDialogStore } from "@/stores";

const userStore = useUsersStore();
const { userData, editUserData } = storeToRefs(userStore);
const { openDialogMsg, closeDialogMsg } = storeToRefs(useDialogStore());

const { getUserData, addUser, deleteUser, editUser, handleEditUser } =
  userStore;

onMounted(() => {
  getUserData();
});
</script>

<template>
  <el-table :data="userData" style="width: 100%" class="mb-4">
    <el-table-column prop="id" label="ID" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="email" label="Email" width="180" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <div class="flex">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEditUser(scope.row.id)"
            >編輯</el-button
          >

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
  <NewDialog
    title="編輯"
    :openMsg="openDialogMsg"
    :closeMsg="closeDialogMsg"
    :hideButton="true"
    :delay="true"
  >
    <EditForm :user="editUserData" @editUser="editUser" />
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
