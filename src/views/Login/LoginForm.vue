<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

type RuleForm = {
  email: string;
  password: string;
};

const emit = defineEmits<{
  (e: "login", value: { email: string; password: string }): void;
}>();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: "",
  password: "",
});

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: "請輸入信箱", trigger: "blur" },
    {
      type: "email",
      message: "請輸入正確的email格式",
      trigger: ["blur", "change"],
    },
  ],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      emit("login", ruleForm);
      // resetForm(ruleFormRef.value);
      // setLoading();
      router.push("/");
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
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" type="email" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密碼" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登入
      </el-button>

      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
