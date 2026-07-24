import type { Category, Product } from "../utils/types";
import ProductForm from "../components/ProductForm";
import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import { getCategories } from "../utils/categoryStorage";
import StockForm from "../components/StockForm";

type StockAction = {
  product: Product;
  mode: "increase" | "decrease";
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = getProducts();

    if (storedProducts.length > 0) {
      return storedProducts;
    }

    return [
      {
        id: "1",
        name: "Cement",
        sku: "PRD001",
        category: "Building Materials",
        price: 2500,
        stockQuantity: 50,
      },
      {
        id: "2",
        name: "Electrical Cable",
        sku: "PRD002",
        category: "Electrical",
        price: 1200,
        stockQuantity: 0,
      },
    ];
  });
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [categories] = useState<Category[]>(() => {
    return getCategories();
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");
  const [stockAction, setStockAction] = useState<StockAction | null>(null);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts((currentProducts) => [...currentProducts, product]);

    setShowForm(false);
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
  };

  const handleDeleteProduct = (productId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
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
    <div>
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search by product name or SKU"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={stockStatus}
          onChange={(event) => setStockStatus(event.target.value)}
        >
          <option value="all">All Stock Status</option>

          <option value="in-stock">In Stock</option>

          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
      <button onClick={() => setShowForm(true)}>Add Product</button>
      {stockAction && (
        <StockForm
          mode={stockAction.mode}
          currentStock={stockAction.product.stockQuantity}
          onSubmitStock={handleStockUpdate}
          onCancel={() => setStockAction(null)}
        />
      )}
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

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>

                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>

                <button
                  onClick={() =>
                    setStockAction({
                      product,
                      mode: "increase",
                    })
                  }
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
                >
                  - Remove Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
