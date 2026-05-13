import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Home = ({ products, addToCart }) => {
  return (
    <Container className="mt-4">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Our Products</h1>
        <p className="text-muted fs-5">Discover our latest collection</p>
      </div>

      {products.length === 0 ? (
        <h3 className="text-center text-muted">No products available yet</h3>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard 
                product={product} 
                addToCart={addToCart} 
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;