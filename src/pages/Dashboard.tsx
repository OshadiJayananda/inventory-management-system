import { useState } from "react";

import type { Category, Product } from "../utils/types";

import { getProducts } from "../utils/storage";
import { getCategories } from "../utils/categoryStorage";

const Dashboard = () => {
  const [products] = useState<Product[]>(() => {
    return getProducts();
  });

  const [categories] = useState<Category[]>(() => {
    return getCategories();
  });

  const totalProducts = products.length;

  const totalInventoryValue = products.reduce((total, product) => {
    return total + product.price * product.stockQuantity;
  }, 0);

  const totalStockQuantity = products.reduce((total, product) => {
    return total + product.stockQuantity;
  }, 0);

  const outOfStockProducts = products.filter(
    (product) => product.stockQuantity === 0,
  ).length;

  const getProductCountByCategory = (categoryName: string) => {
    return products.filter((product) => product.category === categoryName)
      .length;
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <div>
          <h2>Total Products</h2>

          <p>{totalProducts}</p>
        </div>

        <div>
          <h2>Total Inventory Value</h2>

          <p>Rs. {totalInventoryValue.toLocaleString()}</p>
        </div>

        <div>
          <h2>Total Stock Quantity</h2>

          <p>{totalStockQuantity}</p>
        </div>

        <div>
          <h2>Out of Stock</h2>

          <p>{outOfStockProducts}</p>
        </div>
      </div>

      <h2>Products by Category</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}: {getProductCountByCategory(category.name)}{" "}
              products
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
