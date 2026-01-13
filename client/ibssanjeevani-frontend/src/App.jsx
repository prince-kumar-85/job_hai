import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomeDashboard from "./pages/WelcomeDashboard";
import AuthPage from "./auth/AuthPage";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/Profile";

import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/products/ProductDetails";
import AdminProducts from "./pages/admin/AdminProducts";

// (Optional but recommended)
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<WelcomeDashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
