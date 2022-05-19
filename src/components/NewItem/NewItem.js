import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ItemValidationSchema } from "../../helpers/utils/utils";
import { addItem, getAllWarehouses } from "../../helpers/APIcalls/Item";
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useSnackBar } from "../../context/snackbarContext";
export default function NewItem() {
  const [apiErrors, setAPIErrors] = useState([]);
  const { updateSnackBarMessage } = useSnackBar();
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [listOfAllWarehouse, setListOfAllWarehouse] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      category: "",
      warehouse: "",
      description: "",
    },
    validationSchema: ItemValidationSchema,
    onSubmit: async (values) => {
      await addItem({ ...values, warehouse: selectedWarehouse._id })
        .then((res) => {
          if (res.error) {
            updateSnackBarMessage({
              message: res.error.message,
              type: "error",
            });
          } else if (res.errors) {
            setAPIErrors(res.errors);
          } else if (res.success) {
            setAPIErrors([]);
            setSelectedWarehouse({});
            setValues(formik.initialValues);
            setTouched(formik.initialTouched);
            updateSnackBarMessage({
              message: "Item created successfuly!",
              type: "success",
            });
          }
        })
        .catch((err) => {
          updateSnackBarMessage({ message: err, type: "error" });
        });
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setTouched,
    isSubmitting,
  } = formik;

  useEffect(() => {
    getAllWarehouses()
      .then((res) => {
        if (res.success) {
          setListOfAllWarehouse(res.success.warehouses);
        } else if (res.error) {
          updateSnackBarMessage({ message: res.error.message, type: "error" });
        }
      })
      .catch((err) => {
        updateSnackBarMessage(err);
      });
  }, [updateSnackBarMessage]);

  const onSelectedWarehouseChange = (event) => {
    const {
      target: { value },
    } = event;
    listOfAllWarehouse.map((warehouse) => {
      if (warehouse._id === value) {
        setSelectedWarehouse(warehouse);
      }
    });
  };
  return (
    <Box
      sx={{
        my: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        fontSize="24px"
        fontWeight="700"
        letterSpacing=".2rem"
        mb="1rem"
      >
        New Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          sx={{
            width: "300px",
          }}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            id="quantity"
            name="quantity"
            label="Qauntity"
            value={values.quantity}
            onChange={handleChange}
            error={touched.quantity && Boolean(errors.quantity)}
            helperText={touched.quantity && errors.quantity}
          />
          <TextField
            id="category"
            name="category"
            label="Category"
            value={values.category}
            onChange={handleChange}
            error={touched.category && Boolean(errors.category)}
            helperText={touched.category && errors.category}
          />
          <TextField
            onChange={onSelectedWarehouseChange}
            label="Select Warehouse"
            value={selectedWarehouse._id || ""}
            select
          >
            {listOfAllWarehouse?.map((warehouse) => {
              return (
                <MenuItem key={warehouse._id} value={warehouse._id}>
                  {warehouse.name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            id="description"
            name="description"
            label="Description"
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <Button type="submit" variant="contained">
            {isSubmitting ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Add Item"
            )}
          </Button>
          {apiErrors &&
            apiErrors.map((error, index) => {
              return (
                <Typography sx={{ color: "red" }} key={index} fontSize="14px">
                  {error.msg}
                </Typography>
              );
            })}
        </Stack>
      </form>
    </Box>
  );
}
