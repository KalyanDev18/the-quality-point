import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Customer/Profile';
// @ts-ignore
import Home from './pages/Customer/Home';
// @ts-ignore
import Cart from './pages/Customer/Cart';
// @ts-ignore
import MyOrders from './pages/Customer/MyOrders'; 
// @ts-ignore
import CustomerLogin from './pages/Customer/CustomerLogin';
// @ts-ignore
import Dashboard from './pages/Admin/Dashboard';
// @ts-ignore
import AdminLogin from './pages/Admin/AdminLogin';
// @ts-ignore
import { CartProvider } from './context/CartContext';

// YAHAN FOOTER IMPORT KIYA HAI
// @ts-ignore
import Footer from './components/Footer'; 

// Security Guard Component: Agar admin login nahi hai
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('adminAuth') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Main wrapper taaki footer hamesha bottom mein rahe */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} /> 
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/profile" element={<Profile />} /> 
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          
          {/* YAHAN FOOTER LAGA DIYA */}
          <Footer />
          
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;