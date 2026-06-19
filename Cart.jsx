import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    const success = login(email, password);
    setLoading(false);

    if (success) {
      navigate('/home');
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
      padding: '3rem 2rem',
      width: '100%',
      maxWidth: '400px',
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
      padding: '0.875rem',
      border: '1px solid #ddd',
      borderRadius: 'var(--border-radius)',
      fontSize: '0.95rem',
      transition: 'var(--transition)',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
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
    demo: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '1rem',
      marginTop: '1.5rem',
      fontSize: '0.85rem',
    },
    demoTitle: {
      color: 'var(--text-primary)',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    demoText: {
      color: 'var(--text-secondary)',
      margin: '0.25rem 0',
      fontFamily: 'Courier New, monospace',
    },
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.card}>
        <div style={pageStyles.header}>
          <h1 style={pageStyles.title}>Welcome Back!</h1>
          <p style={pageStyles.subtitle}>Sign in to your SmartCart AI account</p>
        </div>

        <form onSubmit={handleSubmit} style={pageStyles.form}>
          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={pageStyles.input}
              required
            />
          </div>

          <div style={pageStyles.formGroup}>
            <label style={pageStyles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={pageStyles.footer}>
          <p style={pageStyles.footerText}>
            Don't have an account?{' '}
            <Link to="/signup" style={pageStyles.link}>Sign up here</Link>
          </p>
        </div>

        <div style={pageStyles.demo}>
          <p style={pageStyles.demoTitle}>📝 Demo Credentials:</p>
          <p style={pageStyles.demoText}>Email: test@example.com</p>
          <p style={pageStyles.demoText}>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
