import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Home = ({ products, addToCart, refreshProducts }) => {
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Products</h2>
        <button 
          className="btn btn-success"
          onClick={refreshProducts}
        >
          Refresh
        </button>
      </div>

      <Row>
        {products.length === 0 ? (
          <p className="text-center">No products available</p>
        ) : (
          products.map((product) => (
            <Col md={6} lg={4} xl={3} className="mb-4" key={product.id}>
              <ProductCard 
                product={product} 
                addToCart={addToCart} 
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;