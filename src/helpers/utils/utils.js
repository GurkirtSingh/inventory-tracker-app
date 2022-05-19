import * as Yup from "yup";
export const ItemValidationSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required!"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .min(0, "Quantity should not less than 0!")
    .required("Quantity is required!"),
  category: Yup.string().optional(),
  warehouse: Yup.string().optional(),
  description: Yup.string().optional(),
});

export const WarehouseValidationSchema = Yup.object().shape({
  name: Yup.string().required("Warehouse name is required!"),
  location: Yup.string().required("Warehouse location is required!"),
  comment: Yup.string().optional(),
});
