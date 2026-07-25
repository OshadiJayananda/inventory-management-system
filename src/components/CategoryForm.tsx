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
      {({ errors, touched }) => (
        <Form className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Category
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a category for organizing your products.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>

            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Enter category name"
              className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-1 ${
                errors.name && touched.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              }`}
            />

            <ErrorMessage
              name="name"
              component="p"
              className="text-sm text-red-600"
            />
          </div>

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
              Save Category
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
