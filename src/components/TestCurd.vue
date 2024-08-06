<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import NewDialog from "./NewDialog.vue";
import AddForm from "./AddForm.vue";
import EditForm from "./EditForm.vue";

import { useUsersStore, useDialogStore } from "../stores";

const userStore = useUsersStore();
const { userData, editUserData } = storeToRefs(userStore);
const { closeDialogMsg } = storeToRefs(useDialogStore());

const { getUserData, addUser, deleteUser, findEditUser, editUser } = userStore;

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
          <NewDialog
            title="編輯"
            :closeMsg="closeDialogMsg"
            :linkType="true"
            :delay="true"
            @click="findEditUser(scope.row.id)"
          >
            <EditForm :user="editUserData" @editUser="editUser" />
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
