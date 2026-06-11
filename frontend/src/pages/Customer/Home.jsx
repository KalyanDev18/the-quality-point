import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { addToCart, cartCount } = useCart(); 
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('customerAuth') === 'true';
  const userName = localStorage.getItem('customerName') || 'User'; 

  const handleLogout = () => {
    localStorage.removeItem('customerAuth');
    localStorage.removeItem('customerPhone');
    localStorage.removeItem('customerName');
    setShowDropdown(false);
    navigate('/'); 
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Data fetch error: ", error));
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dropdownBtnStyle = { 
    textAlign: 'left', padding: '12px 18px', border: 'none', background: 'transparent', 
    cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '14px', 
    fontWeight: '600', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '10px',
    transition: 'background 0.2s'
  };

  return (
    <div style={{ background: '#fefce8', minHeight: '100vh', paddingBottom: '60px', fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif' }}>
      
      {/* Background Shapes */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: '#fca5a5', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '500px', height: '500px', background: '#fed7aa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', bottom: '5%', left: '15%', width: '350px', height: '350px', background: '#fef08a', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.5 }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <nav style={{ 
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(185, 28, 28, 0.85)', 
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          padding: '12px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fef08a' }} onError={(e) => e.target.style.display = 'none'} />
            <h1 style={{ margin: 0, color: '#fef08a', fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '900', letterSpacing: '0.5px' }}>The Quality Point</h1>
          </div>
          
          <input 
            type="text" placeholder="Search products..." 
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '30%', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.2)', color: '#fff', outline: 'none' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {!isAuth ? (
              <button onClick={() => navigate('/login')} style={{ background: '#fef08a', color: '#b91c1c', border: 'none', padding: '8px 24px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(254, 240, 138, 0.2)' }}>
                Login
              </button>
            ) : (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowDropdown(!showDropdown)} style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.4)', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px', backdropFilter: 'blur(4px)' }}>
                  👤 Account ▼
                </button>
                {showDropdown && (
                  <div style={{ position: 'absolute', top: '50px', right: '0', background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(20px)', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', width: '240px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', zIndex: 200 }}>
                    <div style={{ padding: '15px 18px', borderBottom: '1px solid rgba(0,0,0,0.08)', background: 'rgba(254, 240, 138, 0.2)' }}>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>Welcome</p>
                      <p style={{ margin: '2px 0 0 0', fontWeight: '900', color: '#1f2937', fontSize: '18px' }}>{userName}</p>
                    </div>
                    <button onClick={() => { navigate('/profile'); setShowDropdown(false); }} style={dropdownBtnStyle} onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>👤 My Account</button>
                    <button onClick={() => { navigate('/my-orders'); setShowDropdown(false); }} style={dropdownBtnStyle} onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>📦 My Orders</button>
                    <button onClick={() => { navigate('/profile'); setShowDropdown(false); }} style={dropdownBtnStyle} onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>📍 Saved Addresses</button>
                    <button onClick={handleLogout} style={{ ...dropdownBtnStyle, color: '#dc2626', borderBottom: 'none' }} onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>🚪 Log Out</button>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => navigate('/cart')} style={{ background: '#fef08a', color: '#b91c1c', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 10px rgba(254, 240, 138, 0.2)' }}>
              Cart ({cartCount})
            </button>
          </div>
        </nav>

        {/* HERO BANNER & PRODUCTS */}
        <div style={{ padding: '0 5%' }}>
          
          {/* PREMIUM HERO BANNER */}
          <div className="hero-banner" style={{ 
            margin: '30px auto 40px', 
            maxWidth: '1200px', 
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.95) 0%, rgba(153, 27, 27, 0.8) 100%)', 
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 40px rgba(185, 28, 28, 0.2)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(254, 240, 138, 0.4)'
          }}>
            {/* Glow Effects */}
            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '250px', height: '250px', background: 'rgba(254, 240, 138, 0.2)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
            
            {/* Left Content (Text) */}
            <div style={{ padding: '40px 50px', flex: '1 1 500px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', padding: '6px 15px', borderRadius: '20px', color: '#fefce8', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: '16px' }}>📍</span> Delivery Available in Bajra More, Nawada
              </div>
              
              <h2 style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 45px)', fontWeight: '900', margin: '0 0 15px 0', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
                Authentic, Premium <br/><span style={{ color: '#fef08a' }}>Pot-Set Goodness</span>
              </h2>
              
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', margin: '0 0 30px 0', maxWidth: '420px', lineHeight: '1.6', fontWeight: '500' }}>
                Indulge in our rich, pot-set Curd, aromatic Ghee, and traditional sweets made exactly how you love them. Taste the difference today!
              </p>
              
              <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} style={{ background: '#fef08a', color: '#b91c1c', border: 'none', padding: '14px 35px', borderRadius: '12px', fontSize: '16px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 15px rgba(254, 240, 138, 0.3)', transition: 'all 0.3s ease' }} onMouseOver={(e)=>{e.target.style.transform='scale(1.05)'; e.target.style.boxShadow='0 6px 20px rgba(254, 240, 138, 0.5)'}} onMouseOut={(e)=>{e.target.style.transform='scale(1)'; e.target.style.boxShadow='0 4px 15px rgba(254, 240, 138, 0.3)'}}>
                Shop Now ❯
              </button>
            </div>

            {/* Right Content (Image) - FIXED PATH */}
            <div className="hero-image-container" style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'flex-end', height: '350px' }}>
               <img 
                  src="/products/hero-banner.jpg" 
                  alt="Premium Pot-Set Curd and Ghee" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', 
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' 
                  }}
               />
            </div>
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '30px' }}>
            {filteredProducts.map((item) => (
              <div key={item._id} style={{ 
                background: 'rgba(255, 255, 255, 0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.6)',
                padding: '20px', display: 'flex', flexDirection: 'column', 
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)', transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={item.imageUrl} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '15px' }} />
                <h3 style={{ margin: '15px 0 5px 0', color: '#1f2937', fontWeight: '800' }}>{item.name}</h3>
                <p style={{ fontSize: '13px', color: '#4b5563', height: '40px', overflow: 'hidden' }}>{item.description}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px' }}>
                  <span style={{ fontWeight: '900', fontSize: '22px', color: '#047857' }}>₹{item.price}</span>
                  <button onClick={() => addToCart(item)} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(185, 28, 28, 0.2)' }}>ADD</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Mobile Responsive Style */}
      <style>{`
        @media (max-width: 768px) {
          .hero-image-container { display: none !important; }
          .hero-banner { text-align: center; justify-content: center; }
          .hero-banner div { padding: 30px !important; flex: 1 1 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;