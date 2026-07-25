import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

type StockFormProps = {
  mode: "increase" | "decrease";
  currentStock: number;
  onSubmitStock: (quantity: number) => void;
  onCancel: () => void;
};

type StockFormValues = {
  quantity: number | "";
};

const StockForm = ({
  mode,
  currentStock,
  onSubmitStock,
  onCancel,
}: StockFormProps) => {
  const isIncrease = mode === "increase";

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .integer("Quantity must be a whole number")
      .positive("Quantity must be greater than 0")
      .test(
        "stock-limit",
        "Cannot remove more stock than available",
        (value) => {
          if (isIncrease) {
            return true;
          }

          return typeof value === "number" && value <= currentStock;
        },
      ),
  });

  return (
    <Formik<StockFormValues>
      initialValues={{
        quantity: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmitStock(Number(values.quantity));
      }}
    >
      {({ errors, touched }) => (
        <Form className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {isIncrease ? "Increase Stock" : "Decrease Stock"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {isIncrease
                ? "Add incoming stock to the inventory."
                : "Remove stock due to sales or outgoing items."}
            </p>
          </div>

          {/* Current Stock */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Current Stock</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {currentStock}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>

            <Field
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-1 ${
                errors.quantity && touched.quantity
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              }`}
            />

            <ErrorMessage
              name="quantity"
              component="p"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          {/* Actions */}
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
              className={`rounded-lg px-5 py-2.5 font-medium text-white transition ${
                isIncrease
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isIncrease ? "Add Stock" : "Remove Stock"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StockForm;
