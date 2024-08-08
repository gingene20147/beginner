import { defineStore } from "pinia";
import type { ProductType, ProductCategory } from "@/types";

interface State {
  products: ProductType[];
  productInfo: ProductType | null;
  editProduct: ProductType | null;
  selectCategory: ProductCategory | "";
}

export const useProductStore = defineStore("product", {
  state: (): State => ({
    products: [],
    productInfo: null,
    editProduct: null,
    selectCategory: "",
  }),
  actions: {
    mockData(): ProductType[] {
      return [
        {
          id: "1",
          name: "巧克力蛋糕",
          unit: "片",
          price: 100,
          content: "濃郁的巧克力風味，搭配鬆軟的蛋糕體。",
          description: "一款經典的巧克力蛋糕，適合任何場合享用。",
          category: "蛋糕",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "2",
          name: "草莓奶油蛋糕",
          unit: "片",
          price: 120,
          content: "新鮮草莓與香濃奶油的完美結合。",
          description: "清新甜美的草莓奶油蛋糕，是春夏季節的最佳選擇。",
          category: "蛋糕",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "3",
          name: "藍莓乳酪蛋糕",
          unit: "片",
          price: 150,
          content: "酸甜藍莓配上濃郁的乳酪，口感豐富。",
          description: "藍莓與乳酪的絕妙搭配，適合愛吃乳酪蛋糕的朋友。",
          category: "蛋糕",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "4",
          name: "檸檬塔",
          unit: "個",
          price: 80,
          content: "酸甜檸檬內餡搭配酥脆塔皮。",
          description: "清爽的檸檬塔，帶來一整天的好心情。",
          category: "塔",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "5",
          name: "焦糖布丁",
          unit: "杯",
          price: 60,
          content: "滑嫩的布丁搭配香濃焦糖。",
          description: "經典的法式甜點，焦糖布丁帶給你極致的口感享受。",
          category: "布丁",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "6",
          name: "馬卡龍",
          unit: "盒",
          price: 200,
          content: "多種口味的小巧法式甜點。",
          description: "繽紛的馬卡龍，為你的生活增添色彩和甜蜜。",
          category: "餅乾",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "7",
          name: "提拉米蘇",
          unit: "片",
          price: 130,
          content: "咖啡與乳酪完美融合的義式甜點。",
          description: "濃郁的提拉米蘇，讓你品味義大利的浪漫。",
          category: "蛋糕",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "8",
          name: "紅絲絨蛋糕",
          unit: "片",
          price: 140,
          content: "鮮紅色的蛋糕搭配柔滑的奶油乳酪霜。",
          description: "紅絲絨蛋糕的獨特風味，帶給你視覺與味覺的雙重享受。",
          category: "蛋糕",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "9",
          name: "抹茶卷蛋糕",
          unit: "片",
          price: 110,
          content: "香濃抹茶與柔軟蛋糕的完美結合。",
          description: "抹茶控不可錯過的美味甜點。",
          category: "蛋糕",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "10",
          name: "杏仁瓦片",
          unit: "袋",
          price: 90,
          content: "香脆的杏仁片，帶有淡淡的甜味。",
          description: "健康又美味的杏仁瓦片，適合當作下午茶點心。",
          category: "餅乾",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "11",
          name: "香蕉船",
          unit: "個",
          price: 70,
          content: "新鮮香蕉搭配香草冰淇淋，淋上巧克力醬。",
          description: "香蕉船是經典的夏日甜點，帶給你清涼的享受。",
          category: "冰淇淋",
          imageUrl: "https://fakeimg.pl/300/",
        },
        {
          id: "12",
          name: "栗子蒙布朗",
          unit: "個",
          price: 160,
          content: "栗子泥與奶油的豐富口感，底部是酥脆的塔皮。",
          description: "蒙布朗是法國經典甜點，栗子的香氣讓人難以抗拒。",
          category: "塔",
          imageUrl: "https://fakeimg.pl/300/",
        },
      ];
    },
    setProducts(products: ProductType[]) {
      this.products = products;
    },
    getProducts() {
      this.setProducts(this.mockData());
    },
    getProduct(id: string) {
      this.getProducts();
      this.productInfo = this.products.find(
        (product) => product.id === id
      ) as ProductType;
    },
  },
});
