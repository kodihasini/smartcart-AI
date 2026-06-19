import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Toast = () => {
  const { toasts, removeToast } = useContext(AppContext);

  const toastStyles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    toast: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '300px',
      fontWeight: 500,
      animation: 'slideIn 0.3s ease-out',
    },
    success: {
      backgroundColor: '#4caf50',
      color: 'white',
    },
    error: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    info: {
      backgroundColor: '#2196f3',
      color: 'white',
    },
    warning: {
      backgroundColor: '#ff9800',
      color: 'white',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: 0,
      marginLeft: '1rem',
      lineHeight: 1,
    },
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'success':
        return toastStyles.success;
      case 'error':
        return toastStyles.error;
      case 'warning':
        return toastStyles.warning;
      default:
        return toastStyles.info;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div style={toastStyles.container}>
        {toasts.map(toast => (
          <div key={toast.id} style={{ ...toastStyles.toast, ...getTypeStyle(toast.type) }}>
            <span>{toast.message}</span>
            <button 
              style={toastStyles.closeBtn}
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
