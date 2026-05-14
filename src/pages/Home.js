import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = ({ products, addToCart, refreshProducts }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      alert("Product deleted successfully!");
      refreshProducts();        // Refresh the product list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Products</h2>
        
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success"
            onClick={refreshProducts}
          >
            🔄 Refresh
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/add-product'}
          >
            + Add New Product
          </button>
        </div>
      </div>

      <Row>
        {products.length === 0 ? (
          <Col>
            <p className="text-center fs-4 text-muted mt-5">No products available</p>
          </Col>
        ) : (
          products.map((product) => (
            <Col md={6} lg={4} xl={3} className="mb-4" key={product.id}>
              <ProductCard 
                product={product} 
                addToCart={addToCart}
                onDelete={handleDelete}        // ← Important
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;