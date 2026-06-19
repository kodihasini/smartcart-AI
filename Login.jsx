import React from 'react';

const Footer = () => {
  const footerStyles = {
    footer: {
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid #e0e0e0',
      padding: '2rem 0',
      marginTop: '4rem',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      textAlign: 'center',
    },
    text: {
      color: 'var(--text-primary)',
      fontWeight: 500,
      marginBottom: '0.5rem',
    },
    copyright: {
      color: 'var(--text-secondary)',
      fontSize: '0.875rem',
      margin: 0,
    },
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.content}>
        <p style={footerStyles.text}>
          <i className="fas fa-shopping-cart"></i> SmartCart AI | Team 29 | KL University
        </p>
        <p style={footerStyles.copyright}>
          © 2026 SmartCart AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
