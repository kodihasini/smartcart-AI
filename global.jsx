import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(AppContext);

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
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
      marginBottom: '0.5rem',
      marginTop: '2rem',
    },
    count: {
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
      marginBottom: '2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
      paddingBottom: '2rem',
      flex: 1,
    },
    item: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-secondary)',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'var(--transition)',
    },
    badge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'var(--color-accent)',
      color: 'white',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    info: {
      padding: '1.5rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    name: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '0.5rem',
      lineHeight: 1.3,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    category: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)',
      marginBottom: '0.5rem',
    },
    rating: {
      fontSize: '0.85rem',
      color: 'var(--text-secondary)',
      marginBottom: '0.75rem',
    },
    price: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: 'var(--color-primary)',
      marginBottom: '0.75rem',
    },
    alert: {
      backgroundColor: 'rgba(40, 116, 240, 0.1)',
      color: 'var(--color-primary)',
      padding: '0.5rem 0.75rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      marginBottom: '1rem',
    },
    actions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e0e0e0',
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

  if (wishlist.length === 0) {
    return (
      <div style={pageStyles.page}>
        <Header />
        <div style={pageStyles.container}>
          <div style={pageStyles.emptyState}>
            <div style={pageStyles.emptyIcon}>❤️</div>
            <h2 style={pageStyles.emptyTitle}>No items saved yet</h2>
            <p style={pageStyles.emptyMessage}>Start adding products to your wishlist to save them for later</p>
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
        <h1 style={pageStyles.title}>
          <i className="fas fa-heart"></i> My Wishlist
        </h1>
        <p style={pageStyles.count}>{wishlist.length} items saved</p>

        <div style={pageStyles.grid}>
          {wishlist.map(product => (
            <div key={product.id} style={pageStyles.item}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={pageStyles.image}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={pageStyles.badge}>{product.tag}</div>
              </div>

              <div style={pageStyles.info}>
                <h3 style={pageStyles.name}>{product.name}</h3>
                <p style={pageStyles.category}>{product.category}</p>
                <div style={pageStyles.rating}>
                  <i className="fas fa-star" style={{ color: '#ffc107' }}></i>
                  {' '}{product.rating} ({product.reviews} reviews)
                </div>
                <p style={pageStyles.price}>₹{product.price.toLocaleString()}</p>
                <div style={pageStyles.alert}>
                  💡 Smart Alert: Price may change
                </div>
                <div style={pageStyles.actions}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleMoveToCart(product)}
                  >
                    <i className="fas fa-shopping-cart"></i> Move to Cart
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
