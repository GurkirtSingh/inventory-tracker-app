import { useCallback, useEffect, useState } from "react";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  updateItem,
  getItem,
  getAllWarehouses,
} from "../../helpers/APIcalls/Item";
import {
  Button,
  Box,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { ItemValidationSchema } from "../../helpers/utils/utils";
import { useParams } from "react-router-dom";
import { useSnackBar } from "../../context/snackbarContext";
export default function EditItem() {
  const [apiErrors, setAPIErrors] = useState();
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
      setItem(
        Object.assign(item, { ...values, warehouse: selectedWarehouse._id })
      );
      await updateItem(item)
        .then((res) => {
          if (res.error) {
            updateSnackBarMessage({
              message: res.error.message,
              type: "error",
            });
          } else if (res.errors) {
            setAPIErrors([]);
            res.errors.forEach((error) => {
              setAPIErrors([...apiErrors, error.msg]);
            });
          } else if (res.success) {
            setAPIErrors([]);
            setSelectedWarehouse({});
            setValues(formik.initialValues);
            setTouched(formik.initialTouched);
            updateSnackBarMessage({
              message: "Item Updated successfully",
              type: "success",
            });
          }
        })
        .catch((err) => {
          updateSnackBarMessage({
            message: err,
            type: "error",
          });
        });
    },
  });
  const {
    errors,
    setValues,
    setTouched,
    touched,
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    isSubmitting,
  } = formik;

  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem(itemId)
      .then((res) => {
        if (res.success) {
          setItem(res.success.item);
        } else if (res.error) {
          setAPIErrors([res.error.message]);
        } else if (res.errors) {
          setAPIErrors([]);
          res.errors.forEach((error) => {
            setAPIErrors([...apiErrors, error.msg]);
          });
        }
      })
      .catch((err) => {
        setAPIErrors([err.message]);
      });
  }, [itemId, setItem, setAPIErrors]);

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
  }, []);
  useEffect(() => {
    if (item) {
      setFieldValue("name", item.name, false);
      setFieldValue("quantity", item.quantity, false);
      setFieldValue("category", item.category, false);
      setFieldValue("description", item.description, false);
      changeSelectedWarehouse(item.warehouse);
    }
  }, [item, setFieldValue]);

  const changeSelectedWarehouse = (id) => {
    listOfAllWarehouse.map((warehouse) => {
      if (warehouse._id === id) {
        setSelectedWarehouse(warehouse);
      }
    });
  };

  const onSelectedWarehouseChange = (event) => {
    const {
      target: { value },
    } = event;
    changeSelectedWarehouse(value);
  };
  return (
    item && (
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
          Edit Item
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
                "Save Changes"
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
    )
  );
}
