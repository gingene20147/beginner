export type ProductType = {
  id: string;
  name: string;
  unit: string;
  price: number;
  content: string;
  description: string;
  category: ProductCategory;
  imageUrl: string;
};

export type ProductCategory =
  | "蛋糕"
  | "塔"
  | "布丁"
  | "餅乾"
  | "冰淇淋"
  | "其他";
