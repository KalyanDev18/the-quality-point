import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = () => {
    axios.get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Orders fetch error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    let deliveryOtp = '';

    if (newStatus === 'Delivered') {
      deliveryOtp = window.prompt("Delivery confirm karne ke liye Customer ka 4-digit Secret PIN enter karein:");
      if (deliveryOtp === null) return; 
    }

    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { 
        status: newStatus,
        otp: deliveryOtp 
      });
      fetchOrders(); 
      if(newStatus === 'Delivered') alert("✅ Delivery Successful!");
    } catch (error) {
      alert(error.response?.data?.message || 'Status update karne mein error aayi!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    if (status === 'Pending') return { bg: 'rgba(254, 240, 138, 0.8)', text: '#854d0e', label: '⏳ Pending' }; 
    if (status === 'Processing') return { bg: 'rgba(191, 219, 254, 0.8)', text: '#1e3a8a', label: '🚚 Processing' }; 
    if (status === 'Delivered') return { bg: 'rgba(187, 247, 208, 0.8)', text: '#166534', label: '✅ Delivered' }; 
    return { bg: 'rgba(243, 244, 246, 0.8)', text: '#374151', label: status };
  };

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#dc2626' }}>Loading Admin Panel...</h2>;

  return (
    // YAHAN FIX KIYA HAI: Soft Halka Yellow Gradient
    <div style={{ background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)', minHeight: '100vh', paddingBottom: '50px', fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(31, 41, 55, 0.8)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '15px 5%', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#fef08a', fontSize: '24px', fontWeight: '900', letterSpacing: '1px' }}>
            The Quality Point
          </h1>
          <span style={{ color: '#9ca3af', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold' }}>
            ADMIN CONTROL PANEL
          </span>
        </div>
        
        <button 
          onClick={handleLogout} 
          style={{ 
            background: 'rgba(220, 38, 38, 0.9)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 20px', 
            borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', 
            transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
            backdropFilter: 'blur(4px)'
          }}
        >
          🚪 Log Out
        </button>
      </nav>

      <div style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#991b1b', fontSize: '28px', margin: 0, fontWeight: '900', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            Live Orders ({orders.length})
          </h2>
          <button onClick={fetchOrders} style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255, 255, 255, 0.6)', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#1f2937', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            🔄 Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f1d1d', fontSize: '18px', fontWeight: 'bold' }}>Abhi koi naya order nahi aaya hai.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order) => (
              <div key={order._id} style={{ 
                background: 'rgba(255, 255, 255, 0.45)', 
                backdropFilter: 'blur(16px)', 
                WebkitBackdropFilter: 'blur(16px)',
                padding: '25px', 
                borderRadius: '20px', 
                border: '1px solid rgba(255, 255, 255, 0.6)', 
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)', 
                display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' 
              }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: 'bold', background: 'rgba(255,255,255,0.5)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.4)' }}>
                      ID: #{order._id.substring(order._id.length - 6).toUpperCase()}
                    </span>
                    <span style={{ background: getStatusColor(order.status).bg, color: getStatusColor(order.status).text, padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}>
                      {getStatusColor(order.status).label}
                    </span>
                  </div>
                  
                  <h3 style={{ margin: '0 0 5px 0', color: '#1f2937', fontSize: '18px' }}>{order.customerInfo.name}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#4b5563', fontWeight: '600' }}>📞 +91 {order.customerInfo.phone}</p>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>📍 {order.customerInfo.address}</p>
                  <p style={{ marginTop: '10px', color: '#78716c', fontSize: '12px', fontWeight: '500' }}>Time: {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div style={{ flex: 1, minWidth: '200px', background: 'rgba(255, 255, 255, 0.3)', border: '1px solid rgba(255, 255, 255, 0.4)', padding: '15px', borderRadius: '15px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#374151' }}>Order Items:</h4>
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px', color: '#4b5563', fontWeight: '600' }}>
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px dashed rgba(0,0,0,0.1)', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '900', color: '#b91c1c' }}>
                    <span>Total ({order.paymentMode || 'COD'})</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', minWidth: '150px' }}>
                  {order.status === 'Pending' && (
                    <button onClick={() => handleUpdateStatus(order._id, 'Processing')} style={{ background: 'rgba(59, 130, 246, 0.9)', backdropFilter: 'blur(5px)', color: 'white', padding: '10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}>
                      Mark Processing 🚚
                    </button>
                  )}
                  {order.status === 'Processing' && (
                    <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} style={{ background: 'rgba(22, 163, 74, 0.9)', backdropFilter: 'blur(5px)', color: 'white', padding: '10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(22,163,74,0.3)' }}>
                      Mark Delivered ✅
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <div style={{ textAlign: 'center', color: '#16a34a', fontWeight: 'bold', padding: '10px', background: 'rgba(187, 247, 208, 0.6)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '10px', backdropFilter: 'blur(4px)' }}>
                      Order Complete 🎉
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;