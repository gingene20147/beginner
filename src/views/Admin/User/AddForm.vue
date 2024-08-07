<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

type RuleForm = {
  name: string;
  email: string;
  city: "台北市" | "台中市" | "高雄市";
};

const emit = defineEmits<{
  (e: "AddUser", value: { name: string; email: string; city: string }): void;
}>();

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const cities = [
  {
    value: "台北市",
    label: "台北市",
  },
  {
    value: "台中市",
    label: "台中市",
  },
  {
    value: "高雄市",
    label: "高雄市",
  },
];

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  name: "",
  email: "",
  date: formatDate(new Date()),
  city: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "請輸入姓名", trigger: "blur" },
    { min: 3, max: 10, message: "姓名介於 3 到 10 個字之間", trigger: "blur" },
  ],
  email: [
    { required: true, message: "請輸入信箱", trigger: "blur" },
    {
      type: "email",
      message: "請輸入正確的email格式",
      trigger: ["blur", "change"],
    },
  ],
  city: [{ required: true, message: "請選擇城市", trigger: "change" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      emit("AddUser", ruleForm);
      resetForm(ruleFormRef.value);
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" type="email" autocomplete="off" />
    </el-form-item>
    <el-form-item label="居住地" prop="city">
      <el-select
        v-model="ruleForm.city"
        placeholder="請選擇居住地"
        autocomplete="off"
      >
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        新增
      </el-button>

      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
