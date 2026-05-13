import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Home = ({ products, addToCart }) => {
  return (
    <Container className="mt-4">

      <h2 className="mb-4 text-center">
        Our Products
      </h2>

      <Row>
        {products.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <ProductCard
              product={product}
              addToCart={addToCart}
            />
          </Col>
        ))}
      </Row>

    </Container>
  );
};

export default Home;