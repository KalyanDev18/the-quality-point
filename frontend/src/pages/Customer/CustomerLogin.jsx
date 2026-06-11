import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
  const [name, setName] = useState(''); // NAYA: Customer ka naam save karne ke liye
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1: Name & Phone, Step 2: OTP
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Check karna ki naam aur number dono bhare hain ya nahi
    if (name.trim() === '') {
      alert("Kripya apna naam dalein!");
      return;
    }
    if (phone.length === 10) {
      setStep(2); // Sab sahi hai toh OTP wale step par bhejo
    } else {
      alert("Kripya sahi 10-digit mobile number dalein!");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Testing ke liye default OTP '1234'
    if (otp === '1234') {
      localStorage.setItem('customerAuth', 'true');
      localStorage.setItem('customerPhone', phone);
      localStorage.setItem('customerName', name); // NAYA: Naam bhi system mein save ho gaya
      
      alert(`✅ Login Successful! Welcome ${name}`);
      navigate('/cart'); // Wapas cart par bhej do
    } else {
      alert("❌ Galat OTP! Kripya '1234' type karein.");
    }
  };

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', width: '350px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6', textAlign: 'center' }}>
        <h2 style={{ color: '#b91c1c', marginTop: 0, fontSize: '28px', fontWeight: '900', letterSpacing: '-0.5px' }}>The Quality Point</h2>
        <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '14px' }}>Login or Signup to continue</p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* NAYA: Naam ka Input Field */}
            <input 
              type="text" 
              placeholder="Aapka Naam (Your Name)" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '14px 15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px', width: '100%', boxSizing: 'border-box' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '0 10px', backgroundColor: 'white', boxSizing: 'border-box' }}>
              <span style={{ fontWeight: 'bold', color: '#374151', borderRight: '1px solid #d1d5db', paddingRight: '10px' }}>+91</span>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                required 
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Sirf numbers
                style={{ padding: '14px 10px', border: 'none', outline: 'none', fontSize: '15px', width: '100%', backgroundColor: 'transparent' }}
              />
            </div>
            
            <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(22, 163, 74, 0.2)', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
            >
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ color: '#1f2937', fontWeight: 'bold', margin: '0' }}>OTP sent to +91 {phone}</p>
            <p style={{ color: '#16a34a', fontSize: '12px', margin: '0 0 10px 0' }}>(Hint: Use 1234 for testing)</p>
            
            <input 
              type="text" 
              placeholder="Enter 4-digit OTP" 
              required 
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '20px', textAlign: 'center', letterSpacing: '8px', fontWeight: '900', outline: 'none' }}
            />
            
            <button type="submit" style={{ backgroundColor: '#dc2626', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(220, 38, 38, 0.2)' }}>
              Verify & Login
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ backgroundColor: 'transparent', color: '#6b7280', border: 'none', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline', marginTop: '5px' }}>
              Change Name or Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerLogin;