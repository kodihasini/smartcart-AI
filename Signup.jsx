import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { user, logout, cart, wishlist, darkMode, toggleDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const headerStyles = {
    header: {
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'var(--color-primary)',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transition: 'var(--transition)',
    },
    nav: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      flex: 1,
    },
    navLink: {
      color: 'var(--text-primary)',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'var(--transition)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
    },
    cartIcon: {
      fontSize: '1.5rem',
      position: 'relative',
      textDecoration: 'none',
      transition: 'var(--transition)',
      cursor: 'pointer',
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: 'var(--color-accent)',
      color: 'white',
      fontSize: '0.65rem',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
    },
    userMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    userName: {
      color: 'var(--text-primary)',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    mobileMenuBtn: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: 'var(--text-primary)',
    },
  };

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.content}>
        <Link to="/home" style={headerStyles.logo} onClick={closeMobileMenu}>
          <i className="fas fa-shopping-cart"></i>
          SmartCart AI
        </Link>

        <nav style={headerStyles.nav}>
          <Link to="/home" style={headerStyles.navLink} onClick={closeMobileMenu}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/products" style={headerStyles.navLink} onClick={closeMobileMenu}>
            <i className="fas fa-th"></i> Products
          </Link>
          <Link to="/wishlist" style={headerStyles.navLink} onClick={closeMobileMenu}>
            <i className="fas fa-heart"></i> Wishlist
            {wishlist.length > 0 && <span style={{ backgroundColor: 'var(--color-accent)', color: 'white', fontSize: '0.65rem', padding: '0.15rem 0.4rem', borderRadius: '10px', fontWeight: '700' }}>{wishlist.length}</span>}
          </Link>
          <Link to="/tracking" style={headerStyles.navLink} onClick={closeMobileMenu}>
            <i className="fas fa-box"></i> Tracking
          </Link>
        </nav>

        <div style={headerStyles.actions}>
          <button 
            style={{ ...headerStyles.mobileMenuBtn, display: 'block', marginRight: '1rem' }}
            onClick={toggleDarkMode}
            title="Toggle dark mode"
          >
            <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
          </button>

          <Link to="/cart" style={headerStyles.cartIcon} onClick={closeMobileMenu}>
            <i className="fas fa-shopping-bag"></i>
            {cart.length > 0 && <span style={headerStyles.cartBadge}>{cart.length}</span>}
          </Link>

          <div style={headerStyles.userMenu}>
            {user && <span style={headerStyles.userName}>{user.name}</span>}
            <Link to="/settings" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem' }} onClick={closeMobileMenu}>
              <i className="fas fa-user-circle"></i>
            </Link>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        <button 
          style={headerStyles.mobileMenuBtn}
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
