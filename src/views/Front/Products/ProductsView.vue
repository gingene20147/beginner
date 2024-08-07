<script setup lang="ts">
import BaseLayout from "@/layout/BaseLayout.vue";
import { useProductStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { getProducts } = productStore;

onMounted(() => {
  getProducts();
});
</script>

<template>
  <BaseLayout>
    <template #title>
      <section class="title">產品頁面</section>
    </template>
    <template #main>
      <el-row :gutter="24">
        <el-col v-for="product in products" :key="product.id" :sm="12" :lg="6">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>{{ product.name }}</span>
              </div>
            </template>
            <div>
              <p class="text item">價格: {{ product.price }} 元</p>
              <p class="text item">內容: {{ product.content }}</p>
            </div>

            <template #footer>
              <el-button type="primary">點擊看詳細</el-button>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </BaseLayout>
</template>

<style scoped>
.el-row .el-col {
  margin-bottom: 24px;
}
</style>
