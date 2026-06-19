import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';

const Tracking = () => {
  const { addToast } = useContext(AppContext);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState('');

  const steps = [
    { label: 'Order Placed', icon: '📦' },
    { label: 'Confirmed', icon: '✓' },
    { label: 'Packed', icon: '📮' },
    { label: 'Shipped', icon: '🚚' },
    { label: 'Out For Delivery', icon: '🚚' },
    { label: 'Delivered', icon: '✓' }
  ];

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
      setCurrentOrder(order);
      setCurrentStep(0);
      updateETA();
    }
  }, []);

  const updateETA = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    setEta(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      addToast(`Order ${steps[currentStep + 1].label}`, 'success');
    } else {
      addToast('Order already delivered!', 'info');
    }
  };

  const pageStyles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      flex: 1,
    },
    title: {
      fontSize: '2rem',
      color: 'var(--text-primary)',
      marginBottom: '2rem',
      marginTop: '2rem',
    },
    infoCard: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '1.5rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column',
    },
    infoLabel: {
      fontSize: '0.85rem',
      color: 'var(--text-secondary)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '0.5rem',
    },
    infoValue: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'var(--text-primary)',
    },
    trackingContainer: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-sm)',
    },
    progressBar: {
      width: '100%',
      height: '4px',
      backgroundColor: '#e0e0e0',
      borderRadius: '2px',
      marginBottom: '2rem',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
      transition: 'width 0.5s ease',
    },
    stepsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '1rem',
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: 0.5,
      transition: 'var(--transition)',
    },
    stepActive: {
      opacity: 1,
    },
    stepCurrent: {
      opacity: 1,
      transform: 'scale(1.1)',
    },
    stepIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    stepLabel: {
      fontSize: '0.85rem',
      fontWeight: '600',
      textAlign: 'center',
      color: 'var(--text-primary)',
      lineHeight: 1.2,
    },
    statusCard: {
      background: 'linear-gradient(135deg, rgba(40, 116, 240, 0.1), rgba(255, 109, 0, 0.1))',
      borderRadius: 'var(--border-radius)',
      padding: '2rem',
      marginBottom: '2rem',
      borderLeft: '4px solid var(--color-primary)',
    },
    statusTitle: {
      fontSize: '1.25rem',
      color: 'var(--text-primary)',
      marginBottom: '0.75rem',
    },
    statusText: {
      fontSize: '1rem',
      color: 'var(--text-primary)',
      marginBottom: '0.5rem',
    },
    statusDescription: {
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    orderItemsSection: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      color: 'var(--text-primary)',
      marginBottom: '1rem',
    },
    itemsTable: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'var(--bg-secondary)',
      fontWeight: '600',
      color: 'var(--text-primary)',
      fontSize: '0.9rem',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid #e0e0e0',
      alignItems: 'center',
    },
    colProduct: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    itemThumb: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '4px',
    },
    actionContainer: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    deliveryCompleted: {
      textAlign: 'center',
      padding: '3rem 2rem',
      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))',
      borderRadius: 'var(--border-radius)',
      marginBottom: '2rem',
      border: '2px solid #4caf50',
    },
    completedIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      animation: 'bounce 0.6s ease-in-out',
    },
    completedTitle: {
      fontSize: '1.75rem',
      color: '#4caf50',
      marginBottom: '0.5rem',
    },
  };

  if (!currentOrder) {
    return (
      <div style={pageStyles.page}>
        <Header />
        <div style={pageStyles.container}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            <i className="fas fa-info-circle"></i> No active orders to track
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={pageStyles.page}>
      <Header />

      <div style={pageStyles.container}>
        <h1 style={pageStyles.title}>
          <i className="fas fa-box"></i> Order Tracking
        </h1>

        {/* Order Info */}
        <div style={pageStyles.infoCard}>
          <div style={pageStyles.infoItem}>
            <span style={pageStyles.infoLabel}>Order ID:</span>
            <span style={pageStyles.infoValue}>#{currentOrder.id}</span>
          </div>
          <div style={pageStyles.infoItem}>
            <span style={pageStyles.infoLabel}>Order Date:</span>
            <span style={pageStyles.infoValue}>
              {new Date(currentOrder.date).toLocaleDateString()}
            </span>
          </div>
          <div style={pageStyles.infoItem}>
            <span style={pageStyles.infoLabel}>Total Amount:</span>
            <span style={pageStyles.infoValue}>₹{currentOrder.total.toLocaleString()}</span>
          </div>
          <div style={pageStyles.infoItem}>
            <span style={pageStyles.infoLabel}>Estimated Delivery:</span>
            <span style={pageStyles.infoValue}>{eta}</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div style={pageStyles.trackingContainer}>
          <div style={pageStyles.progressBar}>
            <div 
              style={{
                ...pageStyles.progressFill,
                width: `${(currentStep / (steps.length - 1)) * 100}%`
              }}
            ></div>
          </div>

          <div style={pageStyles.stepsContainer}>
            {steps.map((step, index) => (
              <div 
                key={index} 
                style={{
                  ...pageStyles.step,
                  ...(index <= currentStep ? pageStyles.stepActive : {}),
                  ...(index === currentStep ? pageStyles.stepCurrent : {}),
                }}
              >
                <div style={pageStyles.stepIcon}>{step.icon}</div>
                <div style={pageStyles.stepLabel}>{step.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Card */}
        <div style={pageStyles.statusCard}>
          <h2 style={pageStyles.statusTitle}>
            <i className="fas fa-info-circle"></i> Current Status
          </h2>
          <p style={pageStyles.statusText}>
            Your order is <strong>{steps[currentStep].label}</strong>
          </p>
          <p style={pageStyles.statusDescription}>
            {currentStep === 0 && 'Your order has been placed successfully. We are processing it.'}
            {currentStep === 1 && 'Your order has been confirmed and is being prepared.'}
            {currentStep === 2 && 'Your order is being packed and will be shipped soon.'}
            {currentStep === 3 && 'Your order has been shipped and is on its way.'}
            {currentStep === 4 && 'Your order is out for delivery today.'}
            {currentStep === 5 && 'Your order has been delivered successfully!'}
          </p>
        </div>

        {/* Order Items */}
        <div style={pageStyles.orderItemsSection}>
          <h2 style={pageStyles.sectionTitle}>
            <i className="fas fa-list"></i> Order Items
          </h2>
          <div style={pageStyles.itemsTable}>
            <div style={pageStyles.tableHeader}>
              <div>Product</div>
              <div>Price</div>
              <div>Qty</div>
              <div>Total</div>
            </div>
            {currentOrder.items.map(item => (
              <div key={item.id} style={pageStyles.tableRow}>
                <div style={pageStyles.colProduct}>
                  <img src={item.image} alt={item.name} style={pageStyles.itemThumb} />
                  <span>{item.name}</span>
                </div>
                <div>₹{item.price.toLocaleString()}</div>
                <div>{item.quantity}</div>
                <div>₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {currentStep < steps.length - 1 && (
          <div style={pageStyles.actionContainer}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleNextStep}
            >
              <i className="fas fa-arrow-right"></i> Simulate Next Step
            </button>
          </div>
        )}

        {currentStep === steps.length - 1 && (
          <div style={pageStyles.deliveryCompleted}>
            <div style={pageStyles.completedIcon}>🎉</div>
            <h2 style={pageStyles.completedTitle}>Delivery Completed!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Thank you for shopping with SmartCart AI. We hope you enjoy your purchase!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Tracking;
