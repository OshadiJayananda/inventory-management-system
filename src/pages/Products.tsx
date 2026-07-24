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

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts((currentProducts) => [...currentProducts, product]);

    setShowForm(false);
  };

  return (
    <div>
      <h1>Products</h1>

      <button onClick={() => setShowForm(true)}>Add Product</button>
      {showForm && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onCancel={() => setShowForm(false)}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
