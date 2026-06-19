import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, getShippingCharge, getFinalTotal, clearCart, addToast } = useContext(AppContext);

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast('Cart is empty', 'error');
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total: getFinalTotal(),
      date: new Date().toISOString(),
      status: 'Order Placed'
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('currentOrder', JSON.stringify(order));

    addToast('Order placed successfully!', 'success');
    clearCart();
    navigate('/tracking');
  };

  const handleContinueShopping = () => {
    navigate('/products');
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
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr 350px',
      gap: '2rem',
    },
    itemsSection: {
      flex: 1,
    },
    title: {
      fontSize: '2rem',
      color: 'var(--text-primary)',
      marginBottom: '1.5rem',
    },
    itemsList: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    },
    cartItem: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr 120px 100px 40px',
      gap: '1rem',
      alignItems: 'center',
      padding: '1.5rem',
      borderBottom: '1px solid #e0e0e0',
      transition: 'var(--transition)',
    },
    image: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: 'var(--border-radius)',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    itemName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '0.25rem',
    },
    itemCategory: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      marginBottom: '0.5rem',
    },
    itemPrice: {
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--color-primary)',
    },
    quantity: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '0.25rem',
    },
    qtyBtn: {
      width: '32px',
      height: '32px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      color: 'var(--text-primary)',
      transition: 'var(--transition)',
      borderRadius: '4px',
    },
    qtyValue: {
      minWidth: '30px',
      textAlign: 'center',
      fontWeight: '600',
      color: 'var(--text-primary)',
    },
    itemTotal: {
      fontWeight: '600',
      color: 'var(--color-primary)',
      textAlign: 'right',
    },
    removeBtn: {
      width: '40px',
      height: '40px',
      border: 'none',
      backgroundColor: '#ffebee',
      color: '#f44336',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'var(--transition)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    summary: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '1.5rem',
      height: 'fit-content',
      position: 'sticky',
      top: '100px',
    },
    summaryTitle: {
      fontSize: '1.25rem',
      color: 'var(--text-primary)',
      marginBottom: '1.5rem',
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
    },
    summaryValue: {
      fontWeight: '600',
      color: 'var(--text-primary)',
    },
    divider: {
      height: '1px',
      backgroundColor: '#ddd',
      margin: '1rem 0',
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'var(--text-primary)',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 2rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: 0.6,
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '0.5rem',
    },
    emptyMessage: {
      color: 'var(--text-secondary)',
      marginBottom: '2rem',
    },
  };

  if (cart.length === 0) {
    return (
      <div style={pageStyles.page}>
        <Header />
        <div style={pageStyles.container}>
          <div style={pageStyles.emptyState}>
            <div style={pageStyles.emptyIcon}>🛍️</div>
            <h2 style={pageStyles.emptyTitle}>Your cart is empty</h2>
            <p style={pageStyles.emptyMessage}>Start shopping to add items to your cart</p>
            <button 
              className="btn btn-primary"
              onClick={handleContinueShopping}
            >
              <i className="fas fa-shopping-bag"></i> Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={pageStyles.page}>
      <Header />

      <div style={pageStyles.container}>
        <div style={pageStyles.layout}>
          {/* Cart Items */}
          <div style={pageStyles.itemsSection}>
            <h1 style={pageStyles.title}>
              <i className="fas fa-shopping-cart"></i> Shopping Cart
            </h1>
            <div style={pageStyles.itemsList}>
              {cart.map(item => (
                <div key={item.id} style={pageStyles.cartItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <img src={item.image} alt={item.name} style={pageStyles.image} />
                  <div style={pageStyles.details}>
                    <h3 style={pageStyles.itemName}>{item.name}</h3>
                    <p style={pageStyles.itemCategory}>{item.category}</p>
                    <p style={pageStyles.itemPrice}>₹{item.price.toLocaleString()}</p>
                  </div>
                  <div style={pageStyles.quantity}>
                    <button
                      style={pageStyles.qtyBtn}
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      −
                    </button>
                    <span style={pageStyles.qtyValue}>{item.quantity}</span>
                    <button
                      style={pageStyles.qtyBtn}
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      +
                    </button>
                  </div>
                  <div style={pageStyles.itemTotal}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    style={pageStyles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f44336';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffebee';
                      e.currentTarget.style.color = '#f44336';
                    }}
                    title="Remove from cart"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <aside style={pageStyles.summary}>
            <h2 style={pageStyles.summaryTitle}>
              <i className="fas fa-receipt"></i> Order Summary
            </h2>
            <div style={pageStyles.summaryItem}>
              <span>Subtotal</span>
              <span style={pageStyles.summaryValue}>₹{getCartTotal().toLocaleString()}</span>
            </div>
            <div style={pageStyles.summaryItem}>
              <span>Shipping</span>
              <span style={{ ...pageStyles.summaryValue, color: getShippingCharge() === 0 ? '#4caf50' : 'var(--text-primary)' }}>
                {getShippingCharge() === 0 ? 'FREE' : `₹${getShippingCharge()}`}
              </span>
            </div>
            {getShippingCharge() === 0 && (
              <p style={{ fontSize: '0.8rem', color: '#4caf50', marginBottom: '1rem' }}>
                ✓ Free shipping on orders above ₹1999
              </p>
            )}
            <div style={pageStyles.divider}></div>
            <div style={pageStyles.summaryTotal}>
              <span>Total</span>
              <span>₹{getFinalTotal().toLocaleString()}</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              <i className="fas fa-credit-card"></i> Checkout
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleContinueShopping}
              style={{ width: '100%', marginTop: '0.75rem' }}
            >
              <i className="fas fa-shopping-bag"></i> Continue Shopping
            </button>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
