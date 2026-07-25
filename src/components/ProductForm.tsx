import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Category, Product } from "../utils/types";

type ProductFormProps = {
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onCancel: () => void;
  productToEdit?: Product | null;
  categories: Category[];
};

type ProductFormValues = {
  name: string;
  sku: string;
  category: string;
  price: number | "";
  stockQuantity: number | "";
};

const getInitialValues = (
  productToEdit?: Product | null,
): ProductFormValues => {
  if (productToEdit) {
    return {
      name: productToEdit.name,
      sku: productToEdit.sku,
      category: productToEdit.category,
      price: productToEdit.price,
      stockQuantity: productToEdit.stockQuantity,
    };
  }

  return {
    name: "",
    sku: "",
    category: "",
    price: "",
    stockQuantity: "",
  };
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),

  sku: Yup.string().required("SKU is required"),

  category: Yup.string().required("Category is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  stockQuantity: Yup.number()
    .typeError("Stock quantity must be a number")
    .min(0, "Stock quantity cannot be negative")
    .required("Stock quantity is required"),
});

const ProductForm = ({
  onAddProduct,
  onUpdateProduct,
  onCancel,
  productToEdit,
  categories,
}: ProductFormProps) => {
  return (
    <Formik
      enableReinitialize
      initialValues={getInitialValues(productToEdit)}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const product: Product = {
          id: productToEdit ? productToEdit.id : crypto.randomUUID(),

          name: values.name,
          sku: values.sku,
          category: values.category,
          price: Number(values.price),
          stockQuantity: Number(values.stockQuantity),
        };

        if (productToEdit) {
          onUpdateProduct(product);
        } else {
          onAddProduct(product);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {productToEdit ? "Edit Product" : "Add New Product"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {productToEdit
                ? "Update the product information below."
                : "Add a new product to your inventory."}
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>

              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-1 ${
                  errors.name && touched.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                }`}
              />

              <ErrorMessage
                name="name"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* SKU */}
            <div>
              <label
                htmlFor="sku"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                SKU
              </label>

              <Field
                id="sku"
                name="sku"
                type="text"
                placeholder="Enter SKU"
                className={`w-full rounded-lg border px-4 py-2.5 uppercase outline-none transition focus:ring-1 ${
                  errors.sku && touched.sku
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                }`}
              />

              <ErrorMessage
                name="sku"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <Field
                as="select"
                id="category"
                name="category"
                className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none transition focus:ring-1 ${
                  errors.category && touched.category
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                }`}
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name="category"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price
              </label>

              <Field
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                min="0"
                step="0.01"
                className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-1 ${
                  errors.price && touched.price
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                }`}
              />

              <ErrorMessage
                name="price"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label
                htmlFor="stockQuantity"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>

              <Field
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                placeholder="Enter stock quantity"
                min="0"
                className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-1 ${
                  errors.stockQuantity && touched.stockQuantity
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                }`}
              />

              <ErrorMessage
                name="stockQuantity"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white transition hover:bg-gray-700"
            >
              {productToEdit ? "Update Product" : "Save Product"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
