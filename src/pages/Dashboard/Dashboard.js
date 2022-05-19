import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "110vh",
      }}
    >
      <Box
        sx={{
          my: "10vh",
          display: "flex",
          flexDirection: "column",
          width: "60%",
          border: "1px solid black",
        }}
      >
        <AppBar position="static" sx={{ background: "white" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <InventorySharpIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "black",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "black",
                  textDecoration: "none",
                  flexGrow: 1,
                }}
              >
                Inventory Tracker
              </Typography>
              <Button
                onClick={(e) => {
                  navigate("/");
                }}
              >
                Home
              </Button>
              <Button
                onClick={(e) => {
                  navigate("add-item");
                }}
              >
                Add Item
              </Button>
              <Button
                onClick={() => {
                  navigate("add-warehouse");
                }}
              >
                Add Warehouse
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Outlet />
      </Box>
    </Box>
  );
}
