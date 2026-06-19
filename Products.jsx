import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'credit-card',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const success = signup(formData);
    setLoading(false);

    if (success) {
      navigate('/login');
    }
  };

  const pageStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
      padding: '1rem',
    },
    card: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'var(--shadow-lg)',
      padding: '2rem',
      width: '100%',
      maxWidth: '500px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: 'var(--text-primary)',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
    },
    form: {
      marginBottom: '2rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: 'var(--text-primary)',
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: 'var(--border-radius)',
      fontSize: '0.95rem',
      transition: 'var(--transition)',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
    },
    rowGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    },
    button: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: '600',
    },
    footer: {
      textAlign: 'center',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e0e0e0',
    },
    footerText: {
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
      margin: 0,
    },
    link: {
      color: 'var(--color-primary)',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'var(--transition)',
    },
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.card}>
        <div style={pageStyles.header}>
          <h1 style={pageStyles.title}>Create Account</h1>
          <p style={pageStyles.subtitle}>Join SmartCart AI for smart shopping</p>
        </div>

        <form onSubmit={handleSubmit} style={pageStyles.form}>
          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={pageStyles.input}
              required
            />
          </div>

          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={pageStyles.input}
              required
            />
          </div>

          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              style={pageStyles.input}
              required
            />
          </div>

          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your street address"
              value={formData.address}
              onChange={handleChange}
              style={pageStyles.input}
              required
            />
          </div>

          <div style={pageStyles.rowGroup}>
            <div style={pageStyles.formGroup}>
              <label style={pageStyles.label}>City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
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
                placeholder="State"
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
              placeholder="Enter pincode"
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

          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              style={pageStyles.input}
              required
            />
          </div>

          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={pageStyles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={pageStyles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={pageStyles.footer}>
          <p style={pageStyles.footerText}>
            Already have an account?{' '}
            <Link to="/login" style={pageStyles.link}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
