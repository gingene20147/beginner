<script setup lang="ts">
import TestCom from "./components/TestCom.vue";

type DataType = {
  id: string;
  name: string;
  email: string;
};

const data: DataType[] = [
  {
    id: "1",
    name: "John",
    email: "John@example.com",
  },
];
</script>

<template>
  <TestCom />
  <ul>
    <li v-for="user in data">
      name: {{ user.name }} <br />
      email: {{ user.email }}
    </li>
  </ul>
</template>

<style scoped></style>
