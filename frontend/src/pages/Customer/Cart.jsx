import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart(); 
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState('PHONE'); 
  const [phone, setPhone] = useState(localStorage.getItem('customerPhone') || '');
  const [otp, setOtp] = useState(['', '', '', '']);

  const savedAddress = localStorage.getItem('customerAddress');
  const [deliveryOption, setDeliveryOption] = useState(savedAddress ? 'saved' : 'new');
  const [customAddress, setCustomAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI'); 

  const deliveryCharge = cartItems.length > 0 ? 20 : 0; 
  const grandTotal = cartTotal + deliveryCharge;
  const isAuth = localStorage.getItem('customerAuth') === 'true';

  const handleProceed = () => {
    setIsModalOpen(true);
    if (isAuth) setStep('CHECKOUT');
    else setStep('PHONE');
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) setStep('OTP');
    else alert('Please enter exactly 10 digits');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 10) setPhone(value);
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) element.nextSibling.focus();
  };

  const verifyOtpAndGoToCheckout = (e) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      localStorage.setItem('customerAuth', 'true');
      localStorage.setItem('customerPhone', phone);
      localStorage.setItem('customerName', 'User');
      setStep('CHECKOUT');
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  // YAHAN MAIN BACKEND API CALL LAGA DIYA HAI
  const handleFinalCheckout = async () => {
    let finalAddress = '';
    
    if (deliveryOption === 'saved') {
      if (!savedAddress) return alert("No saved address found. Please add a new one.");
      finalAddress = savedAddress;
    } else {
      if (customAddress.trim() === '') return alert("Please enter your delivery address.");
      finalAddress = customAddress;
    }

    const newOrder = {
      customerPhone: phone || localStorage.getItem('customerPhone'),
      customerName: localStorage.getItem('customerName') || 'User',
      items: cartItems,
      totalAmount: grandTotal,
      paymentMode: paymentMode,
      deliveryAddress: finalAddress,
      status: "Pending",
      deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString()
    };

    try {
      // Backend ko order bhej rahe hain
      await axios.post('http://localhost:5000/api/orders', newOrder);
      
      setStep('SUCCESS');
      setTimeout(() => {
        setIsModalOpen(false);
        if(clearCart) clearCart();
        navigate('/my-orders'); 
      }, 2500);

    } catch (error) {
      console.error("Order placing error: ", error);
      alert("Failed to place order. Check if backend is running.");
    }
  };

  return (
    <div style={{ background: '#fefce8', minHeight: '100vh', fontFamily: '"Inter", sans-serif', padding: '40px 5%' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#b91c1c', fontWeight: '900', margin: 0 }}>🛒 My Cart</h1>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid #b91c1c', color: '#b91c1c', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          ← Back to Shop
        </button>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* CART ITEMS */}
        <div style={{ flex: '1 1 60%', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.8)' }}>
          {cartItems?.length === 0 ? (
            <h3 style={{ textAlign: 'center', color: '#666' }}>Your cart is empty</h3>
          ) : (
            cartItems?.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0, color: '#333' }}>{item.name}</h4>
                    <small style={{ color: '#888' }}>Qty: {item.quantity || 1}</small>
                  </div>
                </div>
                <h3 style={{ margin: 0, color: '#16a34a' }}>₹{item.price * (item.quantity || 1)}</h3>
              </div>
            ))
          )}
        </div>

        {/* BILL DETAILS */}
        <div style={{ flex: '1 1 30%', background: '#fff', borderRadius: '20px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Bill Details</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#555' }}>
            <span>Items total</span><span>₹{cartTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#555' }}>
            <span>Delivery charge</span><span style={{ color: '#b91c1c' }}>₹{deliveryCharge}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '15px', fontWeight: 'bold', fontSize: '18px' }}>
            <span>Grand total</span><span style={{ color: '#16a34a' }}>₹{grandTotal}</span>
          </div>

          <button 
            onClick={handleProceed} 
            disabled={cartItems?.length === 0}
            style={{ width: '100%', background: '#b91c1c', color: '#fef08a', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '16px', fontWeight: '900', marginTop: '25px', cursor: cartItems?.length === 0 ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(185, 28, 28, 0.2)' }}
          >
            {isAuth ? 'Proceed to Checkout ❯' : 'Login to Proceed ❯'}
          </button>
        </div>
      </div>

      {/* GLASSMORPHISM MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '24px', padding: '40px', width: '90%', maxWidth: step === 'CHECKOUT' ? '500px' : '400px', textAlign: 'center', boxShadow: '0 20px 50px rgba(185, 28, 28, 0.15)', position: 'relative' }}>
            
            {step !== 'SUCCESS' && (
              <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}>✕</button>
            )}

            {step === 'PHONE' && (
              <>
                <h2 style={{ color: '#b91c1c', margin: '0 0 5px 0', fontSize: '22px', fontWeight: '900' }}>The Quality Point</h2>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Verify your number to checkout</p>
                <form onSubmit={handlePhoneSubmit}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '12px', border: '1px solid #ccc', overflow: 'hidden', marginBottom: '20px' }}>
                    <span style={{ padding: '14px 15px', background: '#f8f8f8', color: '#333', fontWeight: 'bold', borderRight: '1px solid #ccc' }}>+91</span>
                    <input type="tel" placeholder="10-digit mobile number" value={phone} onChange={handlePhoneChange} style={{ width: '100%', padding: '14px 15px', border: 'none', outline: 'none', fontSize: '15px' }} autoFocus required />
                  </div>
                  <button type="submit" style={{ width: '100%', background: '#b91c1c', color: '#fef08a', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>Continue</button>
                </form>
              </>
            )}

            {step === 'OTP' && (
              <>
                <button onClick={() => setStep('PHONE')} style={{ position: 'absolute', top: '15px', left: '15px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>←</button>
                <h2 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '20px', fontWeight: '800' }}>OTP Verification</h2>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Code sent to <strong style={{ color: '#b91c1c' }}>+91-{phone}</strong></p>
                <form onSubmit={verifyOtpAndGoToCheckout}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' }}>
                    {otp.map((data, index) => (
                      <input key={index} type="text" maxLength="1" value={data} onChange={(e) => handleOtpChange(e.target, index)} onFocus={(e) => e.target.select()} style={{ width: '45px', height: '45px', fontSize: '20px', textAlign: 'center', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#fff', fontWeight: 'bold', color: '#b91c1c' }} />
                    ))}
                  </div>
                  <button type="submit" style={{ width: '100%', background: '#16a34a', color: '#fff', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>Verify & Continue</button>
                </form>
              </>
            )}

            {step === 'CHECKOUT' && (
              <div style={{ textAlign: 'left', animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ color: '#b91c1c', marginTop: 0, marginBottom: '20px', fontWeight: '900', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Finalize Order</h2>
                
                <h4 style={{ color: '#1f2937', marginBottom: '10px' }}>📍 Delivery Address</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
                  {savedAddress && (
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', background: deliveryOption === 'saved' ? '#fef2f2' : '#fff', border: deliveryOption === 'saved' ? '2px solid #b91c1c' : '1px solid #ccc', borderRadius: '10px', cursor: 'pointer' }}>
                      <input type="radio" checked={deliveryOption === 'saved'} onChange={() => setDeliveryOption('saved')} style={{ marginTop: '4px', accentColor: '#b91c1c' }} />
                      <div>
                        <strong style={{ display: 'block', color: '#b91c1c', fontSize: '13px' }}>Saved Address</strong>
                        <span style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.4' }}>{savedAddress}</span>
                      </div>
                    </label>
                  )}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', background: deliveryOption === 'new' ? '#fef2f2' : '#fff', border: deliveryOption === 'new' ? '2px solid #b91c1c' : '1px solid #ccc', borderRadius: '10px', cursor: 'pointer' }}>
                    <input type="radio" checked={deliveryOption === 'new'} onChange={() => setDeliveryOption('new')} style={{ marginTop: '4px', accentColor: '#b91c1c' }} />
                    <div style={{ width: '100%' }}>
                      <strong style={{ display: 'block', color: '#1f2937', fontSize: '14px' }}>Deliver to a different address</strong>
                      {deliveryOption === 'new' && (
                        <textarea 
                          rows="3" placeholder="Enter complete flat, area, landmark..." 
                          value={customAddress} onChange={(e) => setCustomAddress(e.target.value)}
                          style={{ width: '100%', marginTop: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', resize: 'vertical', fontFamily: '"Inter", sans-serif' }}
                        />
                      )}
                    </div>
                  </label>
                </div>

                <h4 style={{ color: '#1f2937', marginBottom: '10px' }}>💳 Payment Method</h4>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                  <button onClick={() => setPaymentMode('UPI')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: paymentMode === 'UPI' ? '#fef08a' : '#f9fafb', color: paymentMode === 'UPI' ? '#b91c1c' : '#4b5563', border: paymentMode === 'UPI' ? '2px solid #b91c1c' : '1px solid #ccc', fontWeight: 'bold', cursor: 'pointer' }}>📱 UPI / Online</button>
                  <button onClick={() => setPaymentMode('COD')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: paymentMode === 'COD' ? '#fef08a' : '#f9fafb', color: paymentMode === 'COD' ? '#b91c1c' : '#4b5563', border: paymentMode === 'COD' ? '2px solid #b91c1c' : '1px solid #ccc', fontWeight: 'bold', cursor: 'pointer' }}>💵 Cash on Delivery</button>
                </div>

                <button onClick={handleFinalCheckout} style={{ width: '100%', background: '#16a34a', color: '#fff', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '900', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)' }}>
                  {paymentMode === 'UPI' ? `Pay ₹${grandTotal} Securely` : `Confirm Order (Pay ₹${grandTotal} on Delivery)`}
                </button>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div style={{ padding: '20px 0', animation: 'fadeIn 0.5s ease-in' }}>
                <div style={{ fontSize: '60px', marginBottom: '10px' }}>✅</div>
                <h2 style={{ color: '#16a34a', margin: 0, fontSize: '28px', fontWeight: '900' }}>Order Confirmed!</h2>
                <p style={{ color: '#555', marginTop: '10px', fontSize: '15px' }}>Redirecting to My Orders...</p>
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};

export default Cart;