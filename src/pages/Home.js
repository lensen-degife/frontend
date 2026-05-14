import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { API_BASE_URL } from '../App';   // Import the base URL

const Home = ({ addToCart, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (keyword = '') => {
    setLoading(true);
    try {
      let response;
      if (keyword.trim() !== '') {
        response = await axios.get(
          `${API_BASE_URL}/products/search?keyword=${encodeURIComponent(keyword)}`
        );
      } else {
        response = await axios.get(`${API_BASE_URL}/products`);
      }
      setProducts(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when searchTerm changes
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