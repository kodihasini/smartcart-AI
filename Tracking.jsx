import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import PRODUCTS from '../data/products.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);

  const featuredProducts = PRODUCTS.filter(p => p.trending).slice(0, 6);

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleProductClick = (productId) => {
    navigate(`/products?id=${productId}`);
  };

  const pageStyles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    heroBanner: {
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
      color: 'white',
      padding: '4rem 0',
      textAlign: 'center',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '1rem',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
      opacity: 0.95,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    section: {
      padding: '4rem 0',
    },
    sectionBg: {
      backgroundColor: 'var(--bg-secondary)',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: 'var(--text-primary)',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1.5rem',
    },
    categoryCard: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      padding: '2rem 1rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'var(--transition)',
      boxShadow: 'var(--shadow-sm)',
    },
    categoryIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '2rem',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    featureCard: {
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 'var(--border-radius)',
      padding: '2rem',
      textAlign: 'center',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition)',
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    featureTitle: {
      fontSize: '1.25rem',
      color: 'var(--text-primary)',
      marginBottom: '0.75rem',
    },
    featureText: {
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={pageStyles.page}>
      <Header />

      {/* Hero Banner */}
      <section style={pageStyles.heroBanner}>
        <div style={pageStyles.heroContent}>
          <h1 style={pageStyles.heroTitle}>Smart Shopping Powered by AI</h1>
          <p style={pageStyles.heroSubtitle}>
            Discover products that match your style, budget, and shopping mood.
          </p>
          <div style={pageStyles.heroButtons}>
            <button className="btn btn-primary btn-lg" onClick={handleShopNow}>
              <i className="fas fa-shopping-bag"></i> Shop Now
            </button>
            <button 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid white',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'var(--transition)',
              }}
              onClick={handleShopNow}
            >
              <i className="fas fa-search"></i> Explore Products
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ ...pageStyles.section, ...pageStyles.sectionBg }}>
        <div style={pageStyles.container}>
          <h2 style={pageStyles.sectionTitle}>Shop by Category</h2>
          <div style={pageStyles.categoriesGrid}>
            <div style={pageStyles.categoryCard} onClick={handleShopNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.categoryIcon}>📱</div>
              <h3>Electronics</h3>
            </div>
            <div style={pageStyles.categoryCard} onClick={handleShopNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.categoryIcon}>👕</div>
              <h3>Fashion</h3>
            </div>
            <div style={pageStyles.categoryCard} onClick={handleShopNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.categoryIcon}>🧘</div>
              <h3>Lifestyle</h3>
            </div>
            <div style={pageStyles.categoryCard} onClick={handleShopNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.categoryIcon}>✨</div>
              <h3>Accessories</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={pageStyles.section}>
        <div style={pageStyles.container}>
          <h2 style={pageStyles.sectionTitle}>Trending Now</h2>
          <div style={pageStyles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onCardClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ ...pageStyles.section, ...pageStyles.sectionBg }}>
        <div style={pageStyles.container}>
          <h2 style={pageStyles.sectionTitle}>Why SmartCart AI?</h2>
          <div style={pageStyles.featuresGrid}>
            <div style={pageStyles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.featureIcon}>🤖</div>
              <h3 style={pageStyles.featureTitle}>AI Recommendations</h3>
              <p style={pageStyles.featureText}>Get personalized product recommendations based on your preferences.</p>
            </div>
            <div style={pageStyles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.featureIcon}>❤️</div>
              <h3 style={pageStyles.featureTitle}>Smart Wishlist</h3>
              <p style={pageStyles.featureText}>Save favorites and get notified about price changes.</p>
            </div>
            <div style={pageStyles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.featureIcon}>💰</div>
              <h3 style={pageStyles.featureTitle}>Budget Shopping</h3>
              <p style={pageStyles.featureText}>Filter by price and find deals that fit your budget.</p>
            </div>
            <div style={pageStyles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={pageStyles.featureIcon}>📦</div>
              <h3 style={pageStyles.featureTitle}>Real-Time Tracking</h3>
              <p style={pageStyles.featureText}>Track orders and stay updated with delivery status.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
