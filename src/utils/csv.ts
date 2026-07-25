import type { Product } from "./types";

const escapeCsvValue = (value: string | number): string => {
  const stringValue = String(value);

  return `"${stringValue.replace(/"/g, '""')}"`;
};

export const exportProductsToCsv = (products: Product[]) => {
  const headers = [
    "Product Name",
    "SKU",
    "Category",
    "Price",
    "Stock Quantity",
  ];

  const rows = products.map((product) => [
    product.name,
    product.sku,
    product.category,
    product.price,
    product.stockQuantity,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "inventory-products.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
