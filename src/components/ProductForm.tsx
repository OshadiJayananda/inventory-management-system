import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type ProductFormValues = {
  name: string;
  sku: string;
  category: string;
  price: number | "";
  stockQuantity: number | "";
};

const initialValues: ProductFormValues = {
  name: "",
  sku: "",
  category: "",
  price: "",
  stockQuantity: "",
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

const ProductForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted product:", values);
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

          <Field
            id="category"
            name="category"
            type="text"
            placeholder="Enter category"
          />

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
      </Form>
    </Formik>
  );
};

export default ProductForm;
