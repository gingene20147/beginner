import { defineStore } from "pinia";
import { useMessageStore } from "@/stores";

interface State {
  cart: CartItem[];
}

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const useCartStore = defineStore("cart", {
  state: (): State => ({
    cart: [],
  }),
  actions: {
    addProductToCart(product: CartItem) {
      this.cart.push(product);
      setTimeout(() => {
        useMessageStore().sendTopMessage("success", "商品已加入購物車");
      }, 1200);
    },
    removeProductFromCart(index: number) {
      this.cart.splice(index, 1);
    },
    clearCart() {
      this.cart = [];
    },
  },
  //   getters: {
  //     totalPrice() {
  //       return this.cart.reduce((total, product) => total + product.price, 0);
  //     },
  //   },
});
