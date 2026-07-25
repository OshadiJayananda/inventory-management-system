import type { Category, Product, StockHistory } from "../utils/types";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ProductForm from "../components/ProductForm";
import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import { getCategories } from "../utils/categoryStorage";
import StockForm from "../components/StockForm";
import { exportProductsToCsv } from "../utils/csv";
import {
  getStockHistory,
  saveStockHistory,
} from "../utils/stockHistoryStorage";
import toast from "react-hot-toast";

type StockAction = {
  product: Product;
  mode: "increase" | "decrease";
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    return getProducts();
  });
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [categories] = useState<Category[]>(() => {
    return getCategories();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");
  const [stockAction, setStockAction] = useState<StockAction | null>(null);
  const [stockHistory, setStockHistory] = useState<StockHistory[]>(() => {
    return getStockHistory();
  });

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveStockHistory(stockHistory);
  }, [stockHistory]);

  const handleAddProduct = (product: Product) => {
    setProducts((currentProducts) => [...currentProducts, product]);

    setShowForm(false);

    toast.success("Product created successfully.");
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setShowForm(true);
  };
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );

    setProductToEdit(null);
    setShowForm(false);

    toast.success("Product updated successfully.");
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
  };

  const confirmDeleteProduct = () => {
    if (!productToDelete) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productToDelete),
    );

    setProductToDelete(null);
    toast.success("Product deleted successfully.");
  };

  const handleStockUpdate = (quantity: number) => {
    if (!stockAction) {
      return;
    }

    const { product, mode } = stockAction;

    setProducts((currentProducts) =>
      currentProducts.map((currentProduct) => {
        if (currentProduct.id !== product.id) {
          return currentProduct;
        }

        const newStock =
          mode === "increase"
            ? currentProduct.stockQuantity + quantity
            : currentProduct.stockQuantity - quantity;

        return {
          ...currentProduct,
          stockQuantity: newStock,
        };
      }),
    );

    const newHistoryRecord: StockHistory = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      type: mode,
      quantity,
      timestamp: new Date().toISOString(),
    };

    setStockHistory((currentHistory) => [newHistoryRecord, ...currentHistory]);

    toast.success(
      mode === "increase"
        ? "Stock increased successfully."
        : "Stock decreased successfully.",
    );

    setStockAction(null);
  };

  const filteredProducts = products.filter((product) => {
    const searchValue = searchTerm.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.sku.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesStockStatus =
      stockStatus === "all" ||
      (stockStatus === "in-stock" && product.stockQuantity > 0) ||
      (stockStatus === "out-of-stock" && product.stockQuantity === 0);

    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>

          <p className="mt-2 text-gray-500">
            Manage your inventory products and stock
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => exportProductsToCsv(products)}
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Export CSV
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Stock Form */}
      {stockAction && (
        <StockForm
          mode={stockAction.mode}
          currentStock={stockAction.product.stockQuantity}
          onSubmitStock={handleStockUpdate}
          onCancel={() => setStockAction(null)}
        />
      )}

      {/* Product Form */}
      {showForm && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancel={() => {
            setShowForm(false);
            setProductToEdit(null);
          }}
          productToEdit={productToEdit}
          categories={categories}
        />
      )}

      {/* Search and Filters */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search by name or SKU"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <label
              htmlFor="stock-filter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Stock Status
            </label>

            <select
              id="stock-filter"
              value={stockStatus}
              onChange={(event) => setStockStatus(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            >
              <option value="all">All Stock Status</option>

              <option value="in-stock">In Stock</option>

              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Product Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  SKU
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Stock Quantity
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="transition hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {product.sku}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    Rs. {product.price.toLocaleString()}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {product.stockQuantity}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          setStockAction({
                            product,
                            mode: "increase",
                          })
                        }
                        className="rounded-md bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-100"
                      >
                        + Restock
                      </button>

                      <button
                        onClick={() =>
                          setStockAction({
                            product,
                            mode: "decrease",
                          })
                        }
                        className="rounded-md bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition hover:bg-orange-100"
                      >
                        - Remove Stock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={productToDelete !== null}
        title="Delete product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmLabel="Delete product"
        onConfirm={confirmDeleteProduct}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default Products;
