<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores";

import BaseLayout from "@/layout/BaseLayout.vue";
import { Picture as IconPicture } from "@element-plus/icons-vue";

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
          <el-card body-style="flex-grow: 1">
            <template #header>
              <div class="card-header">
                <span>{{ product.name }}</span>
              </div>
            </template>
            <div class="product-container">
              <el-image :src="product.imageUrl" :alt="product.name">
                <template #error>
                  <div class="image-slot" style="background-color: #ccc">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <p class="text item">價格: {{ product.price }} 元</p>
              <p class="text item">{{ product.description }}</p>
            </div>

            <template #footer>
              <div class="card-footer">
                <router-link :to="`products/${product.id}`"
                  ><el-button type="primary">點擊看詳細</el-button></router-link
                >
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </BaseLayout>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.el-row .el-col {
  margin-bottom: 24px;
}

.card-footer {
  display: flex;
  justify-content: center;
}

.el-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
