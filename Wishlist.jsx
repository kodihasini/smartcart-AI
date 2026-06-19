import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';

const Settings = () => {
  const { user, updateUserProfile, deleteAccount, addToast, toggleDarkMode, darkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    paymentMethod: user?.paymentMethod || 'credit-card',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    updateUserProfile(formData);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccount();
      navigate('/login');
    }
  };

  const pageStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: 'var(--text-primary)',
      marginBottom: '2rem',
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '250px 1fr',
      gap: '2rem',
    },
    sidebar: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '1.5rem',
      height: 'fit-content',
    },
    sidebarItem: {
      padding: '1rem',
      marginBottom: '0.5rem',
      borderRadius: 'var(--border-radius)',
      cursor: 'pointer',
      transition: 'var(--transition)',
      backgroundColor: 'var(--bg-primary)',
      border: '1px solid #e0e0e0',
    },
    content: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      padding: '2rem',
      boxShadow: 'var(--shadow-sm)',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid var(--bg-secondary)',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: 'var(--text-primary)',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: 'var(--border-radius)',
      fontSize: '0.95rem',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
    },
    rowGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
    },
    dangerZone: {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      border: '1px solid #f44336',
      borderRadius: 'var(--border-radius)',
      padding: '1.5rem',
      marginTop: '2rem',
    },
    dangerTitle: {
      color: '#f44336',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    infoCard: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '1rem',
      marginBottom: '1rem',
    },
    infoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      fontSize: '0.95rem',
    },
    label2: {
      fontWeight: '600',
      color: 'var(--text-primary)',
    },
    value: {
      color: 'var(--text-secondary)',
    },
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={pageStyles.container}>
        <h1 style={pageStyles.title}>
          <i className="fas fa-cog"></i> Settings
        </h1>

        <div style={pageStyles.layout}>
          {/* Sidebar */}
          <aside style={pageStyles.sidebar}>
            <div style={pageStyles.sidebarItem}>
              <i className="fas fa-user"></i> Profile
            </div>
            <div style={pageStyles.sidebarItem}>
              <i className="fas fa-moon"></i> Appearance
            </div>
            <div style={pageStyles.sidebarItem}>
              <i className="fas fa-bell"></i> Notifications
            </div>
            <div style={pageStyles.sidebarItem}>
              <i className="fas fa-lock"></i> Security
            </div>
          </aside>

          {/* Main Content */}
          <main style={pageStyles.content}>
            {/* Profile Section */}
            <div style={pageStyles.section}>
              <h2 style={pageStyles.sectionTitle}>
                <i className="fas fa-user-circle"></i> Profile Information
              </h2>

              {!isEditing ? (
                <>
                  <div style={pageStyles.infoCard}>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>Name:</span>
                      <span style={pageStyles.value}>{user?.name}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>Email:</span>
                      <span style={pageStyles.value}>{user?.email}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>Phone:</span>
                      <span style={pageStyles.value}>{user?.phone}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>Address:</span>
                      <span style={pageStyles.value}>{user?.address}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>City:</span>
                      <span style={pageStyles.value}>{user?.city}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>State:</span>
                      <span style={pageStyles.value}>{user?.state}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>Pincode:</span>
                      <span style={pageStyles.value}>{user?.pincode}</span>
                    </div>
                    <div style={pageStyles.infoItem}>
                      <span style={pageStyles.label2}>Payment Method:</span>
                      <span style={pageStyles.value}>{user?.paymentMethod}</span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                    style={{ marginTop: '1rem' }}
                  >
                    <i className="fas fa-edit"></i> Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <div style={pageStyles.formGroup}>
                    <label style={pageStyles.label}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={pageStyles.input}
                    />
                  </div>

                  <div style={pageStyles.formGroup}>
                    <label style={pageStyles.label}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={pageStyles.input}
                    />
                  </div>

                  <div style={pageStyles.formGroup}>
                    <label style={pageStyles.label}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={pageStyles.input}
                    />
                  </div>

                  <div style={pageStyles.formGroup}>
                    <label style={pageStyles.label}>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      style={pageStyles.input}
                    />
                  </div>

                  <div style={pageStyles.rowGroup}>
                    <div style={pageStyles.formGroup}>
                      <label style={pageStyles.label}>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        style={pageStyles.input}
                      />
                    </div>
                    <div style={pageStyles.formGroup}>
                      <label style={pageStyles.label}>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        style={pageStyles.input}
                      />
                    </div>
                  </div>

                  <div style={pageStyles.formGroup}>
                    <label style={pageStyles.label}>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      style={pageStyles.input}
                    />
                  </div>

                  <div style={pageStyles.formGroup}>
                    <label style={pageStyles.label}>Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      style={pageStyles.input}
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="net-banking">Net Banking</option>
                    </select>
                  </div>

                  <div style={pageStyles.buttonGroup}>
                    <button 
                      className="btn btn-primary"
                      onClick={handleSaveProfile}
                    >
                      <i className="fas fa-save"></i> Save Changes
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Appearance Section */}
            <div style={pageStyles.section}>
              <h2 style={pageStyles.sectionTitle}>
                <i className="fas fa-palette"></i> Appearance
              </h2>
              <div style={pageStyles.infoCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Dark Mode</span>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={toggleDarkMode}
                  >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div style={pageStyles.dangerZone}>
              <h3 style={pageStyles.dangerTitle}>
                <i className="fas fa-exclamation-triangle"></i> Danger Zone
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button 
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
                onClick={handleDeleteAccount}
              >
                <i className="fas fa-trash"></i> Delete Account
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
