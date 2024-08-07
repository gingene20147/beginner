<script setup lang="ts">
import BaseLayout from "@/layout/BaseLayout.vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { storeToRefs } from "pinia";

import { useLoginStore } from "@/stores";

const loginStore = useLoginStore();
const { switchLogin } = storeToRefs(loginStore);
const { loginOrRegister, login, register } = loginStore;
</script>

<template>
  <BaseLayout>
    <template #main>
      <LoginForm v-if="switchLogin" @login="login" />
      <RegisterForm v-else @register="register" />
    </template>
    <section class="p-20">
      <div v-if="switchLogin">
        前往<el-button type="primary" plain @click="loginOrRegister"
          >註冊</el-button
        >
      </div>
      <div v-else>
        前往<el-button type="primary" plain @click="loginOrRegister"
          >登入</el-button
        >
      </div>
    </section>
  </BaseLayout>
</template>

<style scoped>
.p-20 {
  padding: 20px;
}
</style>
