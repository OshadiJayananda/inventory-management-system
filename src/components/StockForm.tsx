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
      <Form>
        <h3>{isIncrease ? "Increase Stock" : "Decrease Stock"}</h3>

        <p>Current Stock: {currentStock}</p>

        <div>
          <label htmlFor="quantity">Quantity</label>

          <Field
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
          />

          <ErrorMessage name="quantity" component="div" />
        </div>

        <button type="submit">
          {isIncrease ? "Add Stock" : "Remove Stock"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default StockForm;
