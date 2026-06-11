import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrackOrder = () => {
  const [trackId, setTrackId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderDetails(null);

    // Backend bhejte waqt confirm karna ki 6 characters poore hain
    if (trackId.length !== 6) {
      setError('Tracking ID poore 6 letters/numbers ka hona chahiye.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/orders/track/${trackId}`);
      setOrderDetails(response.data);
    } catch (err) {
      setError('Galat Tracking ID! Kripya apna ID check karein.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Pending') return { bg: '#fef08a', text: '#854d0e', label: '⏳ Order Pending (Pack ho raha hai)' }; 
    if (status === 'Processing') return { bg: '#bfdbfe', text: '#1e3a8a', label: '🚚 Out for Delivery (Raste mein hai)' }; 
    if (status === 'Delivered') return { bg: '#bbf7d0', text: '#166534', label: '✅ Delivered (Pahunch gaya)' }; 
    return { bg: '#f3f4f6', text: '#374151', label: status };
  };

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      <button 
        onClick={() => navigate('/')} 
        style={{ backgroundColor: 'white', padding: '10px 20px', cursor: 'pointer', marginBottom: '30px', borderRadius: '30px', border: '1px solid #e5e7eb', color: '#4b5563', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span>←</span> Back to Shop
      </button>

      <div style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#dc2626', fontSize: '36px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.5px' }}>
          Track Your Order 📍
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '40px', fontSize: '16px' }}>
          Apna 6-character ka Tracking ID niche dalein (Bina # ke)
        </p>

        <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
          <input 
            type="text" 
            placeholder="e.g. A1B2C3" 
            value={trackId}
            onChange={(e) => {
              // YEH HAI SMART LOGIC: # aur spaces ko apne aap hata dega
              const cleanValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
              setTrackId(cleanValue.toUpperCase());
            }}
            required
            maxLength={6}
            style={{ 
              padding: '18px', borderRadius: '12px', border: '2px solid #e5e7eb', 
              fontSize: '24px', width: '80%', textTransform: 'uppercase', 
              textAlign: 'center', fontWeight: '900', letterSpacing: '4px',
              outline: 'none', transition: 'border-color 0.2s',
              backgroundColor: 'white', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
            }}
            onFocus={(e) => e.target.style.borderColor = '#dc2626'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#16a34a', color: 'white', border: 'none', 
              padding: '15px 40px', borderRadius: '30px', fontSize: '18px', 
              fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(22,163,74,0.3)',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            {loading ? 'Tracking...' : 'Track My Order'}
          </button>
        </form>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '12px', borderRadius: '8px', fontWeight: '600', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {orderDetails && (
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #fef08a', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #f3f4f6', paddingBottom: '20px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 'bold' }}>ORDER ID</span>
                <h3 style={{ margin: 0, color: '#1f2937', fontSize: '20px', letterSpacing: '1px' }}>#{trackId}</h3>
              </div>
              <span style={{ backgroundColor: getStatusColor(orderDetails.status).bg, color: getStatusColor(orderDetails.status).text, padding: '10px 18px', borderRadius: '30px', fontWeight: '800', fontSize: '14px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                {getStatusColor(orderDetails.status).label}
              </span>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <p style={{ margin: '0 0 5px 0', color: '#4b5563' }}><strong>Name:</strong> {orderDetails.customerInfo.name}</p>
              <p style={{ margin: '0', color: '#4b5563' }}><strong>Address:</strong> {orderDetails.customerInfo.address}</p>
            </div>
            
            <h4 style={{ color: '#dc2626', margin: '0 0 15px 0', fontSize: '16px' }}>Items Ordered:</h4>
            <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '10px' }}>
              {orderDetails.orderItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#374151', fontWeight: '500' }}>
                  <span>{item.name} <span style={{ color: '#9ca3af' }}>x{item.quantity}</span></span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '2px dashed #f3f4f6', paddingTop: '20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontWeight: 'bold' }}>Total Amount Paid</span>
              <span style={{ color: '#16a34a', fontSize: '24px', fontWeight: '900' }}>₹{orderDetails.totalAmount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;