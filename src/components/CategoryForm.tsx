import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Category } from "../utils/types";

type CategoryFormProps = {
  onAddCategory: (category: Category) => void;
  onCancel: () => void;
};

type CategoryFormValues = {
  name: string;
};

const initialValues: CategoryFormValues = {
  name: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters"),
});

const CategoryForm = ({ onAddCategory, onCancel }: CategoryFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const newCategory: Category = {
          id: crypto.randomUUID(),
          name: values.name.trim(),
        };

        onAddCategory(newCategory);

        resetForm();
      }}
    >
      <Form>
        <div>
          <label htmlFor="name">Category Name</label>

          <Field
            id="name"
            name="name"
            type="text"
            placeholder="Enter category name"
          />

          <ErrorMessage name="name" component="div" />
        </div>

        <button type="submit">Save Category</button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default CategoryForm;
