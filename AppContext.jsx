import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../data/products.jsx';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMood, setSelectedMood] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = PRODUCTS;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedMood !== 'All') {
      filtered = filtered.filter(p => p.mood === selectedMood);
    }

    if (selectedPrice === 'Budget') {
      filtered = filtered.filter(p => p.price < 5000);
    } else if (selectedPrice === 'Premium') {
      filtered = filtered.filter(p => p.price >= 10000);
    } else if (selectedPrice === 'Trending') {
      filtered = filtered.filter(p => p.trending);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedMood, selectedPrice]);

  const handleProductClick = (productId) => {
    window.location.hash = `/product/${productId}`;
  };

  const categories = ['All', 'Electronics', 'Fashion', 'Lifestyle'];
  const moods = ['All', 'Minimal', 'Trendy', 'Luxury'];
  const priceRanges = ['All', 'Budget', 'Premium', 'Trending'];

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
      gridTemplateColumns: '250px 1fr',
      gap: '2rem',
    },
    sidebar: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
      padding: '1.5rem',
      height: 'fit-content',
      position: 'sticky',
      top: '100px',
    },
    filterTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: 'var(--text-primary)',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #e0e0e0',
    },
    filterGroup: {
      marginBottom: '1.5rem',
    },
    filterLabel: {
      display: 'block',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '0.75rem',
      fontSize: '0.95rem',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: 'var(--border-radius)',
      fontSize: '0.9rem',
      transition: 'var(--transition)',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
    },
    filterOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    filterOption: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      transition: 'var(--transition)',
    },
    main: {
      flex: 1,
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      color: 'var(--text-primary)',
      marginBottom: '0.5rem',
    },
    count: {
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
    },
    empty: {
      textAlign: 'center',
      padding: '3rem 2rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--border-radius)',
    },
  };

  return (
    <div style={pageStyles.page}>
      <Header />

      <div style={pageStyles.container}>
        <div style={pageStyles.layout}>
          {/* Sidebar Filters */}
          <aside style={pageStyles.sidebar}>
            <h3 style={pageStyles.filterTitle}>
              <i className="fas fa-filter"></i> Filters
            </h3>

            <div style={pageStyles.filterGroup}>
              <label style={pageStyles.filterLabel}>Search Products</label>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={pageStyles.searchInput}
              />
            </div>

            <div style={pageStyles.filterGroup}>
              <label style={pageStyles.filterLabel}>Category</label>
              <div style={pageStyles.filterOptions}>
                {categories.map(cat => (
                  <label key={cat} style={pageStyles.filterOption}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={pageStyles.filterGroup}>
              <label style={pageStyles.filterLabel}>Mood</label>
              <div style={pageStyles.filterOptions}>
                {moods.map(mood => (
                  <label key={mood} style={pageStyles.filterOption}>
                    <input
                      type="radio"
                      name="mood"
                      value={mood}
                      checked={selectedMood === mood}
                      onChange={(e) => setSelectedMood(e.target.value)}
                      style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                    />
                    <span>{mood}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={pageStyles.filterGroup}>
              <label style={pageStyles.filterLabel}>Price Range</label>
              <div style={pageStyles.filterOptions}>
                {priceRanges.map(range => (
                  <label key={range} style={pageStyles.filterOption}>
                    <input
                      type="radio"
                      name="price"
                      value={range}
                      checked={selectedPrice === range}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Main */}
          <main style={pageStyles.main}>
            <div style={pageStyles.header}>
              <h1 style={pageStyles.title}>
                <i className="fas fa-th"></i> All Products
              </h1>
              <p style={pageStyles.count}>
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>

            {loading ? (
              <div style={pageStyles.productsGrid}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--border-radius)',
                    height: '300px',
                    animation: 'pulse 1.5s infinite',
                  }}></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div style={pageStyles.productsGrid}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCardClick={handleProductClick}
                  />
                ))}
              </div>
            ) : (
              <div style={pageStyles.empty}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  <i className="fas fa-search"></i> No products found
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedMood('All');
                    setSelectedPrice('All');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
