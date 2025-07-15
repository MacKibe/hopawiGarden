import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import HomePage from './pages/HomePage'
import AboutUsPage from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import ShopPage from './pages/ShopPage'
import Layout from './layouts/Layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutUsPage />}></Route>
          <Route path='/contact' element={<ContactPage />}></Route>
          <Route path='/shop' element={<ShopPage />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)