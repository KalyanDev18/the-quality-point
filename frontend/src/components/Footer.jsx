import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Reusable styles for cleaner code
  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '14.5px',
    marginBottom: '12px',
    display: 'block',
    transition: 'color 0.2s ease, transform 0.2s ease',
  };

  const headingStyle = {
    color: '#fef08a', // Brand Yellow
    fontSize: '18px',
    fontWeight: '900',
    marginBottom: '20px',
  };

  // Hover animations
  const handleMouseOver = (e) => {
    e.target.style.color = '#fef08a';
    e.target.style.transform = 'translateX(5px)';
  };
  const handleMouseOut = (e) => {
    e.target.style.color = 'rgba(255, 255, 255, 0.8)';
    e.target.style.transform = 'translateX(0)';
  };

  return (
    <footer style={{
      background: 'rgba(185, 28, 28, 0.95)', // Deep Red Glass Theme
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(254, 240, 138, 0.4)',
      color: '#fefce8',
      padding: '60px 5% 30px',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
      zIndex: 100,
      marginTop: 'auto'
    }}>
      
      {/* MAIN COLUMNS WRAPPER */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(254, 240, 138, 0.2)', paddingBottom: '40px' }}>

        {/* 1. Company */}
        <div style={{ flex: '1 1 140px' }}>
          <h3 style={headingStyle}>Company</h3>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>About</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Careers</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Blog</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Press</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Lead</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Values</Link>
        </div>

        {/* 2. For Consumers */}
        <div style={{ flex: '1 1 140px' }}>
          <h3 style={headingStyle}>For Consumers</h3>
          <Link to="/profile" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Privacy</Link>
          <Link to="/profile" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Terms</Link>
          <Link to="/profile" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>FAQs</Link>
          <Link to="/profile" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Security</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Mobile</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Contact</Link>
        </div>

        {/* 3. For Partners */}
        <div style={{ flex: '1 1 140px' }}>
          <h3 style={headingStyle}>For Partners</h3>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Franchise</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Seller</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Warehouse</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Deliver</Link>
          <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Partner</Link>
        </div>

        {/* 4 & 5. Right Side (Socials + Apps) */}
        <div style={{ flex: '2 1 300px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Follow Us */}
          <div style={{ flex: 1, minWidth: '120px' }}>
            <h3 style={headingStyle}>Follow us</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 45px)', gap: '12px' }}>
              {/* Instagram */}
              <a href="#" style={iconBoxStyle} onMouseOver={iconHoverIn} onMouseOut={iconHoverOut}>📷</a>
              {/* Facebook */}
              <a href="#" style={iconBoxStyle} onMouseOver={iconHoverIn} onMouseOut={iconHoverOut}>📘</a>
              {/* X (Twitter) */}
              <a href="#" style={iconBoxStyle} onMouseOver={iconHoverIn} onMouseOut={iconHoverOut}>𝕏</a>
              {/* LinkedIn */}
              <a href="#" style={iconBoxStyle} onMouseOver={iconHoverIn} onMouseOut={iconHoverOut}>💼</a>
            </div>
          </div>

          {/* Download App */}
          <div style={{ flex: 1, minWidth: '160px' }}>
            <h3 style={headingStyle}>Download App</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Google Play Button */}
              <button style={appStoreBtnStyle} onMouseOver={btnHoverIn} onMouseOut={btnHoverOut}>
                <span style={{ fontSize: '24px' }}>▶️</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px' }}>GET IT ON</p>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>Google Play</p>
                </div>
              </button>

              {/* Apple Store Button */}
              <button style={appStoreBtnStyle} onMouseOver={btnHoverIn} onMouseOut={btnHoverOut}>
                <span style={{ fontSize: '26px' }}>🍎</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af', letterSpacing: '0.5px' }}>Download on the</p>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>App Store</p>
                </div>
              </button>

            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT & DISCLAIMER */}
      <div style={{ maxWidth: '1200px', margin: '20px auto 0', textAlign: 'left' }}>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px', lineHeight: '1.6' }}>
          By continuing past this page you agree to our Terms, Cookie policy and Privacy policy. All trademarks are properties of their respective owners. <br/>
          © The Quality Point Private Limited {new Date().getFullYear()}-{new Date().getFullYear() + 1}
        </p>
      </div>
      
    </footer>
  );
};

// ----- Helper Styles for Buttons/Icons -----

const iconBoxStyle = {
  width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', 
  border: '1px solid rgba(254, 240, 138, 0.3)', display: 'flex', alignItems: 'center', 
  justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '20px', 
  transition: 'all 0.3s ease', cursor: 'pointer'
};

const iconHoverIn = (e) => {
  e.target.style.background = '#fef08a';
  e.target.style.color = '#b91c1c';
  e.target.style.transform = 'scale(1.1)';
};
const iconHoverOut = (e) => {
  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
  e.target.style.color = '#fff';
  e.target.style.transform = 'scale(1)';
};

const appStoreBtnStyle = {
  background: '#1f2937', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', 
  borderRadius: '8px', padding: '8px 15px', display: 'flex', alignItems: 'center', 
  gap: '12px', cursor: 'pointer', transition: 'all 0.2s ease', width: '100%', maxWidth: '180px'
};

const btnHoverIn = (e) => {
  e.currentTarget.style.transform = 'scale(1.05)';
  e.currentTarget.style.border = '1px solid #fef08a';
};
const btnHoverOut = (e) => {
  e.currentTarget.style.transform = 'scale(1)';
  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
};

export default Footer;