export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
};

export type Category = {
  id: string;
  name: string;
};

export type StockHistory = {
  id: string;
  productId: string;
  productName: string;
  type: "increase" | "decrease";
  quantity: number;
  timestamp: string;
};
