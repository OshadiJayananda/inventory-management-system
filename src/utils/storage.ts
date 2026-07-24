import type { Product } from "./types";

const PRODUCTS_STORAGE_KEY = "inventory_products";

export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);

  if (!storedProducts) {
    return [];
  }

  return JSON.parse(storedProducts);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};
