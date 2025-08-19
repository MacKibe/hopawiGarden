import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router"; // Fixed import
import './index.css';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Layout from './layouts/Layout';
import ProductDetails from './components/shop/ProductDetails';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/common/PrivateRoute';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route 
              path='/profile' 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            />
            <Route path='/product/:id' element={<ProductDetails />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);