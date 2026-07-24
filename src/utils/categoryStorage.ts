import type { Category } from "./types";

const CATEGORIES_STORAGE_KEY = "inventory_categories";

export const getCategories = (): Category[] => {
  const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);

  if (!storedCategories) {
    return [];
  }

  return JSON.parse(storedCategories);
};

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
};
