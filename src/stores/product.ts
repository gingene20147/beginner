import { defineStore } from "pinia";
import type { ProductType, ProductCategory } from "@/types";

interface State {
  products: ProductType[];
  editProduct: ProductType | null;
  selectCategory: ProductCategory | "";
}

export const useProductStore = defineStore("product", {
  state: (): State => ({
    products: [],
    editProduct: null,
    selectCategory: "",
  }),
  actions: {
    mockData(): ProductType[] {
      return [
        {
          id: "1",
          name: "Apple",
          price: 10,
          content: "content",
          description: "description",
          category: "食品",
        },
        {
          id: "2",
          name: "Banana",
          price: 20,
          content: "content",
          description: "description",
          category: "食品",
        },
        {
          id: "3",
          name: "上衣",
          price: 300,
          content: "content",
          description: "description",
          category: "衣服",
        },
        {
          id: "4",
          name: "手機",
          price: 10000,
          content: "content",
          description: "description",
          category: "電子產品",
        },
        {
          id: "5",
          name: "耳機",
          price: 500,
          content: "content",
          description: "description",
          category: "電子產品",
        },
        {
          id: "6",
          name: "手錶",
          price: 2000,
          content: "content",
          description: "description",
          category: "電子產品",
        },
      ];
    },
    setProducts(products: ProductType[]) {
      this.products = products;
    },
    setEditProduct(product: ProductType) {
      this.editProduct = product;
    },
    setSelectCategory(category: ProductCategory | "") {
      this.selectCategory = category;
    },
    getProducts() {
      this.setProducts(this.mockData());
    },
    addProduct(product: ProductType) {
      this.products.push(product);
    },
    updateProduct(product: ProductType) {
      const index = this.products.findIndex((p) => p.id === product.id);
      this.products[index] = product;
    },
    deleteProduct(id: string) {
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
