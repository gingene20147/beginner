export type ProductType = {
  id: string;
  name: string;
  price: number;
  content: string;
  description: string;
  category: ProductCategory;
};

export type ProductCategory = "電子產品" | "衣服" | "食品";
