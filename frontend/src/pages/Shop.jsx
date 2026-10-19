import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const PRODUCTS_PER_PAGE = 8;
const emptyPagination = {
  currentPage: 1,
  totalPages: 0,
  totalProducts: 0
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(emptyPagination);

  useEffect(() => {
    let ignoreResponse = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(PRODUCTS_PER_PAGE)
        });
        if (search.trim()) {
          params.set('search', search.trim());
        }

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) {
          throw new Error('Unable to load products');
        }

        const data = await res.json();
        if (!ignoreResponse) {
          setProducts(Array.isArray(data.products) ? data.products : []);
          setPagination(data.pagination || emptyPagination);
          if (data.pagination?.currentPage && data.pagination.currentPage !== currentPage) {
            setCurrentPage(data.pagination.currentPage);
          }
        }
      } catch (error) {
        if (!ignoreResponse) {
          console.error(error);
          setProducts([]);
          setPagination(emptyPagination);
        }
      } finally {
        if (!ignoreResponse) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      ignoreResponse = true;
    };
  }, [currentPage, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="shop-container">
      <h2>All Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
        className="search-bar"
      />
      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <p className="empty-products">No products found.</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <nav className="pagination" aria-label="Product pages">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
              >
                Previous
              </button>
              {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => goToPage(page)}
                  className={page === currentPage ? 'active' : ''}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!pagination.hasNextPage}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;