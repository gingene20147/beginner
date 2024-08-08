<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

type RuleForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const emit = defineEmits<{
  (
    e: "register",
    value: { email: string; password: string; confirmPassword: string }
  ): void;
}>();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: "",
  password: "",
  confirmPassword: "",
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
  password: [
    { required: true, message: "請輸入密碼", trigger: "blur" },
    { min: 6, message: "密碼長度至少6位", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "請輸入確認密碼", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === ruleForm.password) {
          callback();
        } else {
          callback(new Error("兩次輸入密碼不一致"));
        }
      },
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      emit("register", ruleForm);
      // resetForm(ruleFormRef.value);
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
    <el-form-item label="確認密碼" prop="confirmPassword">
      <el-input
        v-model="ruleForm.confirmPassword"
        type="password"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        註冊
      </el-button>

      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
