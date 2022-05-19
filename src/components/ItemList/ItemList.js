import { useState, useEffect } from "react";
import {
  getAllItems,
  deleteItem as deleteItemApi,
  getAllWarehouses,
} from "../../helpers/APIcalls/Item";
import {
  Typography,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  tableCellClasses,
  tableRowClasses,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSnackBar } from "../../context/snackbarContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "14px",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    borderBottom: `.5px solid ${theme.palette.secondary.main}`,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ItemList() {
  const [itemListData, setItemList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [listOfAllWarehouse, setListOfAllWarehouse] = useState([]);
  const { updateSnackBarMessage } = useSnackBar();
  const navigate = useNavigate();

  const openDeleteDialog = (itemId) => {
    setDeleteItem(itemListData.find((x) => x._id === itemId));
    setOpenDialog(true);
  };
  const closeDeleteDialog = () => {
    setDeleteItem(null);
    setOpenDialog(false);
  };
  const OnDeleteClickHandler = async () => {
    if (!deleteItem._id) {
      updateSnackBarMessage({
        message: "Please Select Item to delete!",
        type: "warning",
      });
      return;
    }
    deleteItemApi(deleteItem._id)
      .then((res) => {
        if (res.success) {
          setTotalItems(totalItems - 1);
        } else if (res.error) {
          console.log(res.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    closeDeleteDialog();
  };

  const getWarehouseNameById = (id) => {
    let name = "";
    listOfAllWarehouse.map((warehouse) => {
      if (warehouse._id === id) {
        name = warehouse.name;
      }
    });
    return name;
  };

  useEffect(() => {
    getAllItems().then((data) => {
      if (data.success) {
        setItemList(data.success.items);
        setTotalItems(data.success.items.length);
      } else {
        console.log(data);
      }
    });
  }, [totalItems]);

  useEffect(() => {
    getAllWarehouses()
      .then((res) => {
        if (res.success) {
          setListOfAllWarehouse(res.success.warehouses);
        } else if (res.error) {
          updateSnackBarMessage({ message: res.error.message, type: "error" });
        }
      })
      .catch((res) => {
        updateSnackBarMessage(res);
      });
  }, [updateSnackBarMessage]);
  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "Column",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "#797979",
        }}
      >
        Now Showing {totalItems} Items
      </Typography>
      <TableContainer
        sx={{
          mt: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Warehouse</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemListData.map((item, index) => (
              <StyledTableRow key={item.name}>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell>{item.quantity}</StyledTableCell>
                <StyledTableCell>{item.category}</StyledTableCell>
                <StyledTableCell>
                  {getWarehouseNameById(item.warehouse)}
                </StyledTableCell>
                <StyledTableCell>{item.description}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    component="span"
                    onClick={() => {
                      navigate(`${item._id}/edit-item`);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component="span"
                    onClick={() => openDeleteDialog(item._id)}
                  >
                    <DeleteForeverIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete item permanently?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete the "
            {deleteItem ? <strong>{deleteItem.name}</strong> : "selected"}"
            permanently from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={OnDeleteClickHandler} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
