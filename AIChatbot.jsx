import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product, onCardClick }) => {
  const { addToCart, addToWishlist, isInWishlist } = useContext(AppContext);
  const inWishlist = isInWishlist(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const cardStyles = {
    container: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
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
    discountBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
    wishlistBtn: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#ddd',
      transition: 'var(--transition)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)',
    },
    info: {
      padding: '1rem',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    name: {
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '0.5rem',
      lineHeight: 1.3,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    meta: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      flexWrap: 'wrap',
    },
    category: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      backgroundColor: 'var(--bg-secondary)',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
    },
    rating: {
      fontSize: '0.875rem',
      color: 'var(--text-secondary)',
      marginBottom: '0.75rem',
    },
    priceSection: {
      marginBottom: '1rem',
    },
    price: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: 'var(--color-primary)',
    },
    originalPrice: {
      fontSize: '0.875rem',
      color: 'var(--text-secondary)',
      textDecoration: 'line-through',
      marginLeft: '0.5rem',
    },
    btn: {
      marginTop: 'auto',
      width: '100%',
    },
  };

  return (
    <div 
      style={cardStyles.container}
      onClick={() => onCardClick(product.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={cardStyles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={cardStyles.image}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={cardStyles.badge}>{product.tag}</div>
        {discount > 0 && <div style={cardStyles.discountBadge}>{discount}% OFF</div>}
        <button 
          style={{
            ...cardStyles.wishlistBtn,
            backgroundColor: inWishlist ? 'rgba(255, 109, 0, 0.1)' : 'white',
            color: inWishlist ? 'var(--color-accent)' : '#ddd',
          }}
          onClick={handleAddToWishlist}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={`fa${inWishlist ? 's' : 'r'} fa-heart`}></i>
        </button>
      </div>
      <div style={cardStyles.info}>
        <h3 style={cardStyles.name}>{product.name}</h3>
        <div style={cardStyles.meta}>
          <span style={cardStyles.category}>{product.category}</span>
        </div>
        <div style={cardStyles.rating}>
          <i className="fas fa-star" style={{ color: '#ffc107' }}></i>
          {' '}{product.rating} ({product.reviews} reviews)
        </div>
        <div style={cardStyles.priceSection}>
          <span style={cardStyles.price}>₹{product.price.toLocaleString()}</span>
          <span style={cardStyles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
        </div>
        <button 
          className="btn btn-primary"
          style={cardStyles.btn}
          onClick={handleAddToCart}
        >
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
