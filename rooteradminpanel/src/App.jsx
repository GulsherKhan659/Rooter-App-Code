import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductComponent from "./screens/ProductComponent";
import CategoryComponent from "./screens/CategoryComponent";
import UserComponent from "./screens/UserComponent";
import Dashboard from "./screens/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "./components/AdminLayout";
import Transactions from "./screens/Transactions";
import OrderComponent from "./screens/OrderComponent";
import MediaUpload from "./screens/MediaUpload";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
          <Route path="/products" element={<ProductComponent />} />
          <Route path="/categories" element={<CategoryComponent />} />
          <Route path="/users" element={<UserComponent />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/orders" element={<OrderComponent/>} />
          <Route path="/mediaGallery" element={<MediaUpload/>} />
          </Route>
        </Routes>
  </Router>
  );
}

export default App;
