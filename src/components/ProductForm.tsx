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
      <Form>
        <div>
          <label htmlFor="name">Product Name</label>

          <Field
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
          />

          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="sku">SKU</label>

          <Field id="sku" name="sku" type="text" placeholder="Enter SKU" />

          <ErrorMessage name="sku" component="div" />
        </div>

        <div>
          <label htmlFor="category">Category</label>

          <Field as="select" id="category" name="category">
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Field>

          <ErrorMessage name="category" component="div" />
        </div>

        <div>
          <label htmlFor="price">Price</label>

          <Field
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
          />

          <ErrorMessage name="price" component="div" />
        </div>

        <div>
          <label htmlFor="stockQuantity">Stock Quantity</label>

          <Field
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            placeholder="Enter stock quantity"
          />

          <ErrorMessage name="stockQuantity" component="div" />
        </div>

        <button type="submit">Save Product</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default ProductForm;
