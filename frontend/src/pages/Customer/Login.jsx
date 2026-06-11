import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(phone.length >= 10) {
      // Yahan aapka OTP / Login logic aayega
      localStorage.setItem('customerAuth', 'true');
      localStorage.setItem('customerPhone', phone);
      localStorage.setItem('customerName', name);
      navigate('/');
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <div style={{ background: '#fefce8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontFamily: '"Inter", sans-serif', overflow: 'hidden' }}>
      
      {/* Background Shapes (Red & Yellow Blobs for Glass Effect) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: '#fca5a5', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '500px', height: '500px', background: '#fed7aa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.5 }}></div>
      </div>

      {/* Glassmorphism Login Card */}
      <div style={{ 
        position: 'relative', zIndex: 1, 
        background: 'rgba(255, 255, 255, 0.4)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)',
        padding: '40px 30px', 
        borderRadius: '25px', 
        border: '1px solid rgba(255, 255, 255, 0.6)', 
        boxShadow: '0 10px 40px rgba(185, 28, 28, 0.1)',
        width: '90%', maxWidth: '400px',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <img src="/logo.jpg" alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px', border: '3px solid #b91c1c', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
        
        <h2 style={{ color: '#b91c1c', margin: '0 0 5px 0', fontSize: '26px', fontWeight: '900' }}>The Quality Point</h2>
        <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '25px', fontWeight: '500' }}>Login or Signup to continue</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Name Input */}
          <input 
            type="text" 
            placeholder="Aapka Naam (Your Name)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '14px 15px', borderRadius: '12px', border: '1px solid rgba(185, 28, 28, 0.3)', background: 'rgba(255, 255, 255, 0.8)', outline: 'none', fontSize: '15px', fontWeight: '500', color: '#1f2937' }}
          />

          {/* Phone Input with +91 */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: '1px solid rgba(185, 28, 28, 0.3)', overflow: 'hidden' }}>
            <span style={{ padding: '14px 15px', background: 'rgba(185, 28, 28, 0.05)', color: '#b91c1c', fontWeight: 'bold', borderRight: '1px solid rgba(185, 28, 28, 0.2)' }}>+91</span>
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%', padding: '14px 15px', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', fontWeight: '500', color: '#1f2937' }}
              required
            />
          </div>

          {/* Submit Button (Red Theme instead of Green) */}
          <button type="submit" style={{ background: '#b91c1c', color: '#fef08a', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 15px rgba(185, 28, 28, 0.2)', transition: 'transform 0.2s ease' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
            Get OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;