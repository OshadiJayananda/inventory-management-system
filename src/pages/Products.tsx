import type { Product } from "../utils/types";

const Products = () => {
  const products: Product[] = [
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

  return (
    <div>
      <h1>Products</h1>

      <button>Add Product</button>

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
