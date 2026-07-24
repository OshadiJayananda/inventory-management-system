import type { Product } from "../utils/types";
import ProductForm from "../components/ProductForm";
import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../utils/storage";

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
  return (
    <div>
      <h1>Products</h1>

      <button onClick={() => setShowForm(true)}>Add Product</button>
      {showForm && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancel={() => {
            setShowForm(false);
            setProductToEdit(null);
          }}
          productToEdit={productToEdit}
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
          {products.map((product) => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
