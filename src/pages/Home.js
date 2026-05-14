import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { API_BASE_URL } from '../App';

const Home = ({ addToCart, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (keyword = '') => {
    setLoading(true);
    try {
      const url = keyword.trim() !== ''
        ? `${API_BASE_URL}/products/search?keyword=${encodeURIComponent(keyword)}`
        : `${API_BASE_URL}/products`;

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search when navbar searchTerm changes
  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/product/${id}`);
      fetchProducts(searchTerm);
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Our Products</h2>

      {loading && <p className="text-center">Searching...</p>}

      <Row>
        {products.length === 0 && !loading ? (
          <Col>
            <p className="text-center fs-4 text-muted mt-5">
              {searchTerm ? `No results found for "${searchTerm}"` : "No products available"}
            </p>
          </Col>
        ) : (
          products.map((product) => (
            <Col md={6} lg={4} xl={3} className="mb-4" key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                onDelete={handleDelete}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;