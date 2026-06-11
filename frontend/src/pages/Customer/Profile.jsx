import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('customerName') || 'User';
  const userPhone = localStorage.getItem('customerPhone') || '';
  
  // States
  const [activeTab, setActiveTab] = useState('address'); 
  const [address, setAddress] = useState(localStorage.getItem('customerAddress') || '');
  
  // New Modal & Form States for Detailed Address
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    flat: '',
    floor: '',
    area: '',
    landmark: '',
    name: userName,
    phone: userPhone
  });

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);
  
  const faqs = [
    { q: "What are your delivery timings?", a: "Hum rozana subah 8:00 AM se raat 10:00 PM tak delivery karte hain. Koshish rehti hai ki aapka order 15-30 minute mein pahunch jaye!" },
    { q: "Delivery charges kya hain?", a: "₹500 se upar ke orders par delivery bilkul FREE hai! Usse kam ke order par nominal ₹20 ka delivery charge lagta hai." },
    { q: "Kya main apna order return kar sakta hoon?", a: "Haan bilkul! Agar aapko koi defective ya expire ho chuka product milta hai, toh aap delivery ke waqt hi humare executive ko return kar sakte hain." },
    { q: "Payment ke kon kon se options available hain?", a: "Aap UPI (PhonePe, GPay, Paytm) ya Cash on Delivery (COD) dono mein se koi bhi option choose kar sakte hain." },
    { q: "Mera order kahan tak pahuncha, kaise check karun?", a: "Aap 'My Orders' section mein ja kar apne order ka live status (Pending, Processing, ya Delivered) check kar sakte hain." }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('customerAuth') === 'true';
    if (!isAuth) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('customerAuth');
    localStorage.removeItem('customerPhone');
    localStorage.removeItem('customerName');
    navigate('/'); 
  };

  const handleFormChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const saveDetailedAddress = (e) => {
    e.preventDefault();
    if(!addressForm.flat || !addressForm.area || !addressForm.name || !addressForm.phone) {
      return alert('Please fill all required (*) fields');
    }
    const formattedAddress = `${addressForm.type} - ${addressForm.flat}, ${addressForm.floor ? addressForm.floor + ' Floor, ' : ''}${addressForm.area}. Landmark: ${addressForm.landmark}. Receiver: ${addressForm.name} (${addressForm.phone})`;
    
    localStorage.setItem('customerAddress', formattedAddress);
    setAddress(formattedAddress);
    setShowAddressModal(false);
  };

  const deleteAddress = () => {
    localStorage.removeItem('customerAddress');
    setAddress('');
  };

  const deleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? All data will be lost permanently.");
    if(confirmDelete) {
      localStorage.clear();
      navigate('/');
    }
  };

  const menuItems = [
    { id: 'orders', label: 'My Orders', action: () => navigate('/my-orders') },
    { id: 'address', label: 'Saved Addresses', action: () => setActiveTab('address') },
    { id: 'prescriptions', label: 'My Prescriptions', action: () => setActiveTab('prescriptions') },
    { id: 'giftcards', label: 'E-Gift Cards', action: () => setActiveTab('giftcards') },
    { id: 'faqs', label: "FAQ's", action: () => setActiveTab('faqs') },
    { id: 'privacy', label: 'Account Privacy', action: () => setActiveTab('privacy') },
    { id: 'logout', label: 'Log Out', action: handleLogout, color: '#dc2626' }
  ];

  return (
    <div style={{ background: '#fefce8', minHeight: '100vh', paddingBottom: '60px', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glass Shapes */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: '#fca5a5', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '500px', height: '500px', background: '#fed7aa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.5 }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '30px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* TOP HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(185, 28, 28, 0.85)', backdropFilter: 'blur(16px)', padding: '15px 25px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(185, 28, 28, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '30px' }}>
          <h1 style={{ color: '#fef08a', fontSize: '24px', fontWeight: '900', margin: 0 }}>👤 My Account</h1>
          <button onClick={() => navigate('/')} style={{ background: '#fef08a', color: '#b91c1c', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800' }}>
            ← Back to Shop
          </button>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDEBAR */}
          <div style={{ flex: '1 1 300px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.7)', boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '25px', borderBottom: '1px solid rgba(185, 28, 28, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}>
              <h2 style={{ margin: '0 0 5px 0', color: '#1f2937', fontSize: '22px', fontWeight: '800' }}>{userName}</h2>
              <p style={{ margin: 0, color: '#6b7280', fontWeight: '600', fontSize: '15px' }}>+91 {userPhone}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {menuItems.map((item) => (
                <button 
                  key={item.id} onClick={item.action}
                  style={{ 
                    textAlign: 'left', padding: '18px 25px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '600',
                    background: activeTab === item.id ? 'rgba(185, 28, 28, 0.1)' : 'transparent',
                    color: item.color || (activeTab === item.id ? '#b91c1c' : '#4b5563'),
                    borderLeft: activeTab === item.id ? '4px solid #b91c1c' : '4px solid transparent',
                    borderBottom: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { if(activeTab !== item.id) e.target.style.background = 'rgba(255,255,255,0.5)' }}
                  onMouseOut={(e) => { if(activeTab !== item.id) e.target.style.background = 'transparent' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div style={{ flex: '2 1 500px', background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.7)', padding: '30px', boxShadow: '0 8px 32px rgba(31, 38, 135, 0.07)', minHeight: '450px' }}>
            
            {/* TAB: SAVED ADDRESSES */}
            {activeTab === 'address' && (
              <div style={{ animation: 'fadeIn 0.3s ease', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#b91c1c', marginBottom: '20px', fontSize: '22px', fontWeight: '800' }}>My Addresses</h3>
                {address ? (
                  <div style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(185, 28, 28, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ background: '#fef08a', color: '#854d0e', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
                        {address.split('-')[0].trim()}
                      </span>
                      <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6', fontSize: '15px', fontWeight: '500' }}>{address.split('-')[1]}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', marginLeft: '20px' }}>
                      <button onClick={() => setShowAddressModal(true)} style={{ background: 'transparent', color: '#b91c1c', border: '1px solid #b91c1c', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>✎ Edit</button>
                      <button onClick={deleteAddress} style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🗑 Delete</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '80px', marginBottom: '10px' }}>🏝️</div>
                    <h3 style={{ color: '#1f2937', margin: '0 0 10px 0', fontSize: '20px' }}>You have no saved addresses</h3>
                    <p style={{ color: '#6b7280', margin: '0 0 25px 0', fontSize: '14px' }}>Tell us where you want your orders delivered</p>
                    <button onClick={() => setShowAddressModal(true)} style={{ background: '#b91c1c', color: '#fef08a', padding: '12px 30px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(185, 28, 28, 0.2)' }}>
                      Add New Address
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: FAQ's (NEW ACCORDION DESIGN) */}
            {activeTab === 'faqs' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 style={{ color: '#b91c1c', marginBottom: '20px', fontSize: '22px', fontWeight: '800' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {faqs.map((faq, index) => (
                    <div key={index} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '12px', border: '1px solid rgba(185, 28, 28, 0.2)', overflow: 'hidden', transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                      <button 
                        onClick={() => toggleFaq(index)} 
                        style={{ width: '100%', padding: '15px 20px', background: openFaq === index ? 'rgba(185, 28, 28, 0.05)' : 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', color: '#1f2937', textAlign: 'left', transition: 'background 0.3s ease' }}
                      >
                        {faq.q}
                        <span style={{ fontSize: '20px', color: '#b91c1c', transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                          +
                        </span>
                      </button>
                      {openFaq === index && (
                        <div style={{ padding: '0 20px 15px 20px', color: '#4b5563', fontSize: '14px', lineHeight: '1.6', background: 'rgba(185, 28, 28, 0.05)' }}>
                          <div style={{ paddingTop: '10px', borderTop: '1px dashed rgba(185, 28, 28, 0.2)' }}>
                            {faq.a}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ACCOUNT PRIVACY (Danger Zone) */}
            {activeTab === 'privacy' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 style={{ color: '#b91c1c', marginBottom: '20px', fontSize: '22px', fontWeight: '800' }}>Account Privacy</h3>
                <div style={{ background: 'rgba(254, 242, 242, 0.8)', padding: '25px', borderRadius: '15px', border: '1px dashed #ef4444' }}>
                  <h4 style={{ color: '#dc2626', margin: '0 0 10px 0' }}>⚠️ Danger Zone</h4>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '20px', lineHeight: '1.6' }}>Deleting your account will remove all your personal information, saved addresses, and order history permanently from our system. This action cannot be undone.</p>
                  <button onClick={deleteAccount} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)' }}>Delete My Account</button>
                </div>
              </div>
            )}

            {/* OTHER TABS */}
            {['prescriptions', 'giftcards'].includes(activeTab) && (
              <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', paddingTop: '40px' }}>
                <span style={{ fontSize: '50px', marginBottom: '15px' }}>🚀</span>
                <h3 style={{ color: '#b91c1c', fontSize: '24px', fontWeight: '800', margin: '0 0 10px 0' }}>Coming Soon!</h3>
                <p style={{ color: '#6b7280', maxWidth: '300px', lineHeight: '1.5' }}>We are working hard to bring this feature to you.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '24px', width: '90%', maxWidth: '800px', display: 'flex', overflow: 'hidden', boxShadow: '0 20px 50px rgba(185, 28, 28, 0.2)', position: 'relative', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ flex: 1, background: '#fefce8', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', display: window.innerWidth < 768 ? 'none' : 'flex' }}>
              <span style={{ fontSize: '60px', marginBottom: '15px' }}>🗺️</span>
              <h3 style={{ color: '#b91c1c', margin: '0 0 10px 0' }}>Pinpoint Location</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Please provide detailed address for a seamless delivery experience.</p>
            </div>
            <div style={{ flex: 1.5, padding: '30px', position: 'relative' }}>
              <button onClick={() => setShowAddressModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>✕</button>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#1f2937' }}>Enter complete address</h2>
              <form onSubmit={saveDetailedAddress} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                  {['Home', 'Work', 'Hotel', 'Other'].map(type => (
                    <button type="button" key={type} onClick={() => setAddressForm({...addressForm, type})} 
                      style={{ padding: '8px 15px', borderRadius: '20px', border: addressForm.type === type ? '2px solid #b91c1c' : '1px solid #ccc', background: addressForm.type === type ? '#fef2f2' : '#fff', color: addressForm.type === type ? '#b91c1c' : '#4b5563', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                      {type}
                    </button>
                  ))}
                </div>
                <input type="text" name="flat" placeholder="Flat / House no / Building name *" value={addressForm.flat} onChange={handleFormChange} required style={inputStyle} />
                <input type="text" name="floor" placeholder="Floor (optional)" value={addressForm.floor} onChange={handleFormChange} style={inputStyle} />
                <input type="text" name="area" placeholder="Area / Sector / Locality *" value={addressForm.area} onChange={handleFormChange} required style={inputStyle} />
                <input type="text" name="landmark" placeholder="Nearby landmark (optional)" value={addressForm.landmark} onChange={handleFormChange} style={inputStyle} />
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '5px 0 0 0' }}>Enter your details for seamless delivery experience</p>
                <input type="text" name="name" placeholder="Your name *" value={addressForm.name} onChange={handleFormChange} required style={inputStyle} />
                <input type="tel" name="phone" placeholder="Your phone number *" value={addressForm.phone} onChange={handleFormChange} required style={inputStyle} />
                <button type="submit" style={{ background: '#b91c1c', color: '#fef08a', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
                  Save Address
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px', color: '#1f2937', fontFamily: '"Inter", sans-serif'
};

export default Profile;