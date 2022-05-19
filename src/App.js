import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ItemList from "./components/ItemList/ItemList";
import NewItem from "./components/NewItem/NewItem";
import EditItem from "./components/EditItem/EditItem";
import NewWarehouse from "./components/NewWarehouse/NewWarehouse";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { SnackBarProvider } from "./context/snackbarContext";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<ItemList />} />
              <Route path="/add-item" element={<NewItem />} />
              <Route path=":itemId/edit-item" element={<EditItem />} />
              <Route path="/add-warehouse" element={<NewWarehouse />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
