<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore, useCartStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";

import BaseLayout from "@/layout/BaseLayout.vue";
import { Picture as IconPicture } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const { getProduct } = productStore;
const { productInfo } = storeToRefs(productStore);
const { addProductToCart } = cartStore;

const num = ref(1);
const handleAddCart = (product: any) => {
  setLoading();
  addProductToCart(product);
};

const loading = ref(false);
const setLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

onMounted(() => {
  getProduct(route.params.id);

  if (!productInfo.value) {
    router.push({ name: "NotFound" });
  }
});
</script>

<template>
  <BaseLayout>
    <template #title>
      <section class="title">產品介紹</section>
    </template>
    <template #main>
      <el-row :gutter="24">
        <el-col :md="12">
          <el-image
            :src="productInfo?.imageUrl"
            :alt="productInfo?.name"
            class="image-container ratio-square"
          >
            <template #error>
              <div class="image-slot" style="background-color: #ccc">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </el-col>
        <el-col :md="12">
          <div class="product-container">
            <p>名稱: {{ productInfo?.name }}</p>
            <p>介紹: {{ productInfo?.content }}</p>
            <p>名稱: {{ productInfo?.description }}</p>
            <p>價格: {{ productInfo?.price }} / {{ productInfo?.unit }}</p>
            <!-- <div class="product-footer">
              <el-input-number v-model="num" :min="1" :max="10" />
              <el-button
                type="primary"
                :loading="loading"
                plain
                @click="
                  handleAddCart({
                    id: productInfo?.id,
                    name: productInfo?.name,
                    price: productInfo?.price,
                    quantity: num,
                  })
                "
                >加入購物車</el-button
              >
            </div> -->
          </div>
        </el-col>
      </el-row>
    </template>
  </BaseLayout>
</template>

<style>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ratio-square {
  aspect-ratio: 1 / 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}
</style>
