import { useState } from "react";
import type { Category, Product } from "../utils/types";
import { getProducts } from "../utils/storage";
import { getCategories } from "../utils/categoryStorage";
import CategoryChart from "../components/CategoryChart";

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

  const categoryChartData = categories.map((category) => {
    const productCount = products.filter(
      (product) => product.category === category.name,
    ).length;

    return {
      category: category.name,
      productCount,
    };
  });
  const getProductCountByCategory = (categoryName: string) => {
    return products.filter((product) => product.category === categoryName)
      .length;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-2 text-gray-500">Overview of your inventory</p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Products */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Products</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalProducts}
          </p>
        </div>

        {/* Inventory Value */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Inventory Value</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            Rs. {totalInventoryValue.toLocaleString()}
          </p>
        </div>

        {/* Total Stock */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Stock</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalStockQuantity}
          </p>
        </div>

        {/* Out of Stock */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Out of Stock</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {outOfStockProducts}
          </p>
        </div>
      </div>

      {/* Category Analytics Chart */}
      {categories.length > 0 && <CategoryChart data={categoryChartData} />}

      {/* Category Overview */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Products by Category
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Number of products in each category
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <p className="font-medium text-gray-800">{category.name}</p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {getProductCountByCategory(category.name)}
                </p>

                <p className="text-sm text-gray-500">products</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
