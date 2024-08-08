<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useLoginStore } from "@/stores";

const loginStore = useLoginStore();
const { user } = storeToRefs(loginStore);
const { logout } = loginStore;

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    :router="true"
  >
    <el-menu-item index="0" :route="{ path: '/' }">
      <img
        style="width: 100px"
        src="https://element-plus.org/images/element-plus-logo.svg"
        alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" :route="{ path: '/login' }" v-if="!user?.name"
      >登入</el-menu-item
    >
    <el-sub-menu index="2">
      <template #title>前台</template>
      <el-menu-item index="2-1" :route="{ path: '/' }">首頁</el-menu-item>
      <el-menu-item index="2-2" :route="{ path: '/products' }"
        >產品頁面</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3" v-if="user?.name">
      <template #title>後台</template>
      <el-menu-item index="3-1" :route="{ path: '/admin/user' }"
        >管理使用者</el-menu-item
      >
    </el-sub-menu>
    <!-- <el-sub-menu index="4" v-if="user?.name">
      <template #title>使用者功能</template>
      <el-menu-item index="4-1" @click="logout" :route="{ path: '/' }"
        >登出</el-menu-item
      >
      <el-menu-item index="4-2" disabled>test</el-menu-item>
    </el-sub-menu> -->
    <li style="display: flex; align-items: center" v-if="user?.name">
      <el-button @click="logout">登出</el-button>
    </li>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
