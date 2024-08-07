<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElFormItem } from "element-plus";

type RuleForm = {
  name: string;
  email: string;
  city: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  date: string;
  city: "台北市" | "台中市" | "高雄市";
};

const props = defineProps<{ user: User }>();

const emit = defineEmits<{
  (
    e: "editUser",
    value: {
      id: string;
      name: string;
      email: string;
      date: string;
      city: "台北市" | "台中市" | "高雄市";
    }
  ): void;
}>();

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

const ruleForm = reactive({ ...props.user });

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
      // console.log(ruleForm);
      emit("editUser", ruleForm);
    } else {
      console.log("error submit!");
    }
  });
};

const disableSubmit = computed(() => {
  return (
    props.user.name !== ruleForm.name ||
    props.user.email !== ruleForm.email ||
    props.user.city !== ruleForm.city
  );
});
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
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
        :disabled="!disableSubmit"
      >
        修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
