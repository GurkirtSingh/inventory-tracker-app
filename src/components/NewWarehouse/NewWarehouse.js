import { useState } from "react";
import { useFormik } from "formik";
import { WarehouseValidationSchema } from "../../helpers/utils/utils";
import { addWarehouse } from "../../helpers/APIcalls/Item";
import {
  Button,
  Box,
  Typography,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useSnackBar } from "../../context/snackbarContext";
export default function NewWarehouse() {
  const [apiErrors, setAPIErrors] = useState();
  const { updateSnackBarMessage } = useSnackBar();
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      comment: "",
    },
    validationSchema: WarehouseValidationSchema,
    onSubmit: async (values) => {
      await addWarehouse(values)
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
            setValues(formik.initialValues);
            setTouched(formik.initialTouched);
            updateSnackBarMessage({
              message: "Warehouse created successfully",
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
    setValues,
    setTouched,
    touched,
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = formik;
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
        New Warehouse
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
            id="location"
            name="location"
            label="Location"
            value={values.location}
            onChange={handleChange}
            error={touched.location && Boolean(errors.location)}
            helperText={touched.location && errors.location}
          />
          <TextField
            id="comment"
            name="comment"
            label="Comment"
            value={values.comment}
            onChange={handleChange}
            error={touched.comment && Boolean(errors.comment)}
            helperText={touched.comment && errors.comment}
          />
          <Button variant="contained" type="submit">
            {isSubmitting ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Add Warehouse"
            )}
          </Button>
        </Stack>
        {apiErrors &&
          apiErrors.map((error, index) => {
            return (
              <Typography sx={{ color: "red" }} key={index} fontSize="14px">
                {error.msg}
              </Typography>
            );
          })}
      </form>
    </Box>
  );
}
