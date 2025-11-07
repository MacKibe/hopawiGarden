import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProductDetails from "./components/shop/ProductDetails";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/common/PrivateRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/common/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PlainLayout from "./layouts/PlainLyout";
import PublicLayout from "./layouts/PublicLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <ScrollToTop />
      <Routes>
        {/* Public Layout Routes (with Header & Footer) */}
        <Route
          element={
            <PublicLayout>
              <Outlet />
            </PublicLayout>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Plain Layout Routes (with Header only) */}
        <Route
          element={
            <PlainLayout>
              <Outlet />
            </PlainLayout>
          }
        >
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin Layout Routes (completely separate) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
