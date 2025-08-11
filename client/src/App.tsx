import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import HomePage from './pages/HomePage'
import AboutUsPage from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Layout from './layouts/Layout';
import ProductDetails from './components/shop/ProductDetails';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutUsPage />}></Route>
          <Route path='/contact' element={<ContactPage />}></Route>
          <Route path='/shop' element={<ShopPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/product/:id' element={<ProductDetails />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)