import type { StockHistory } from "./types";

const STOCK_HISTORY_STORAGE_KEY = "inventory_stock_history";

export const getStockHistory = (): StockHistory[] => {
  const storedHistory = localStorage.getItem(STOCK_HISTORY_STORAGE_KEY);

  if (!storedHistory) {
    return [];
  }

  return JSON.parse(storedHistory);
};

export const saveStockHistory = (history: StockHistory[]): void => {
  localStorage.setItem(STOCK_HISTORY_STORAGE_KEY, JSON.stringify(history));
};
