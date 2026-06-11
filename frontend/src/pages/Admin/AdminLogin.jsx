import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Yahan maine default ID aur Password set kiya hai (Aap ise badal sakte hain)
    if (username === 'kalyan' && password === 'nawada123') {
      // Login success: Browser ki memory mein chabi (token) save kar lo
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin'); // Dashboard par bhej do
    } else {
      alert('❌ Galat Username ya Password!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#b91c1c', marginBottom: '20px', marginTop: '0' }}>Admin Login</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            required 
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
          <button 
            type="submit" 
            style={{ backgroundColor: '#1f2937', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            Login Securely
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;