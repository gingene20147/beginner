<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

type RuleForm = {
  name: string;
  email: string;
};

const emit = defineEmits<{
  (e: "AddUser", value: { name: string; email: string }): void;
}>();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  name: "",
  email: "",
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

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        新增
      </el-button>

      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
