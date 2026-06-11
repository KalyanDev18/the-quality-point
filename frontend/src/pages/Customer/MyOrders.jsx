import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('customerAuth') === 'true';
  const userPhone = localStorage.getItem('customerPhone');

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    // YAHAN FIX KIYA HAI: Ab ye direct Backend (MongoDB/Node.js) se orders fetch karega
    axios.get(`http://localhost:5000/api/orders/user/${userPhone}`)
      .then(res => { 
        // Data ko reverse kar rahe hain taaki latest order sabse upar dikhe
        setOrders(res.data.reverse()); 
        setLoading(false); 
      })
      .catch(err => {
        console.error("Orders fetch error from backend:", err);
        setLoading(false);
      });

  }, [isAuth, navigate, userPhone]);

  const getStatusColor = (status) => {
    if (status === 'Pending') return { bg: 'rgba(254, 240, 138, 0.8)', text: '#854d0e', label: '⏳ Pending', border: '#eab308' }; 
    if (status === 'Processing') return { bg: 'rgba(191, 219, 254, 0.8)', text: '#1e3a8a', label: '🚚 Processing', border: '#3b82f6' }; 
    if (status === 'Delivered') return { bg: 'rgba(187, 247, 208, 0.8)', text: '#166534', label: '✅ Delivered', border: '#22c55e' }; 
    return { bg: 'rgba(243, 244, 246, 0.8)', text: '#374151', label: status, border: '#9ca3af' };
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fefce8' }}><h2 style={{ color: '#b91c1c' }}>📦 Loading your orders...</h2></div>;

  return (
    <div style={{ background: '#fefce8', minHeight: '100vh', paddingBottom: '60px', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Shapes for Glassmorphism Effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: '#fca5a5', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '500px', height: '500px', background: '#fed7aa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', top: '40%', left: '20%', width: '350px', height: '350px', background: '#fef08a', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.5 }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '30px 5%' }}>
        
        {/* PREMIUM HEADER */}
        <div style={{ maxWidth: '900px', margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(185, 28, 28, 0.85)', backdropFilter: 'blur(16px)', padding: '15px 25px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(185, 28, 28, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <h1 style={{ color: '#fef08a', fontSize: '24px', fontWeight: '900', margin: 0 }}>My Orders 📦</h1>
          <button onClick={() => navigate('/')} style={{ background: '#fef08a', color: '#b91c1c', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            ← Back to Shop
          </button>
        </div>

        {/* USER INFO BAR */}
        <div style={{ maxWidth: '900px', margin: '0 auto 30px', padding: '12px 25px', borderRadius: '15px', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(185, 28, 28, 0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ color: '#b91c1c', fontWeight: 'bold', margin: 0 }}>Registered Account:</p>
          <p style={{ color: '#1f2937', fontWeight: '900', margin: 0 }}>+91 {userPhone}</p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(15px)', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '60px', marginBottom: '10px' }}>🛒</div>
              <h3 style={{ color: '#b91c1c', fontSize: '22px', fontWeight: '800' }}>You haven't placed any orders yet.</h3>
              <p style={{ color: '#4b5563', marginBottom: '20px' }}>Looks like your fridge is missing our awesome products!</p>
              <button onClick={() => navigate('/')} style={{ background: '#b91c1c', color: '#fef08a', padding: '12px 30px', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 15px rgba(185, 28, 28, 0.2)' }}>Start Shopping</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {orders.map((order, index) => {
                const orderId = order._id || order.id || "ORD123";
                const orderItems = order.items || order.orderItems || [];
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleString() : (order.date || 'Just Now');

                return (
                  /* GLASSMORPHISM ORDER CARD */
                  <div key={index} style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.7)', padding: '25px', boxShadow: '0 8px 32px rgba(31, 38, 135, 0.07)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                    
                    {/* Left Side: Order Details */}
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <span style={{ fontSize: '12px', color: '#b91c1c', fontWeight: '900', background: 'rgba(185, 28, 28, 0.1)', padding: '4px 10px', borderRadius: '8px' }}>
                        ORDER ID: #{orderId.substring(orderId.length - 6).toUpperCase()}
                      </span>
                      
                      <div style={{ marginTop: '20px' }}>
                        {orderItems.map((item, idx) => (
                          <p key={idx} style={{ margin: '8px 0', color: '#1f2937', fontWeight: '600', fontSize: '15px' }}>
                            <span style={{ color: '#b91c1c', fontWeight: '900' }}>{item.quantity || 1}x</span> {item.name}
                          </p>
                        ))}
                      </div>

                      {/* Display Delivery Address if available */}
                      {order.deliveryAddress && (
                        <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.6)', borderRadius: '8px', border: '1px solid #ddd' }}>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: 'bold' }}>DELIVER TO:</p>
                          <p style={{ fontSize: '13px', color: '#333', margin: 0, lineHeight: '1.4' }}>{order.deliveryAddress}</p>
                        </div>
                      )}

                      <p style={{ marginTop: '15px', color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>
                        Placed on: {orderDate}
                      </p>
                    </div>

                    {/* Right Side: Status & Total */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      
                      {/* Status Badge */}
                      <span style={{ background: getStatusColor(order.status || 'Pending').bg, color: getStatusColor(order.status || 'Pending').text, border: `1px solid ${getStatusColor(order.status || 'Pending').border}`, padding: '8px 16px', borderRadius: '20px', fontWeight: '800', fontSize: '14px', backdropFilter: 'blur(4px)' }}>
                        {getStatusColor(order.status || 'Pending').label}
                      </span>
                      
                      <div style={{ textAlign: 'right', marginTop: '25px' }}>
                        
                        {/* Secret PIN */}
                        {order.status !== 'Delivered' && order.deliveryOtp && (
                          <div style={{ background: 'rgba(254, 242, 242, 0.8)', padding: '10px 15px', borderRadius: '12px', border: '2px dashed #dc2626', marginBottom: '15px', textAlign: 'center', boxShadow: '0 4px 10px rgba(220, 38, 38, 0.1)' }}>
                            <p style={{ margin: 0, fontSize: '11px', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase' }}>Delivery PIN</p>
                            <p style={{ margin: 0, fontSize: '24px', color: '#b91c1c', fontWeight: '900', letterSpacing: '5px' }}>{order.deliveryOtp}</p>
                          </div>
                        )}
                        
                        {/* Total Amount */}
                        <p style={{ margin: '0', fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>Total Paid ({order.paymentMode || 'COD'})</p>
                        <h2 style={{ margin: '0', color: '#047857', fontSize: '28px', fontWeight: '900' }}>₹{order.totalAmount}</h2>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;