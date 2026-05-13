import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="h-100 shadow-sm hover-shadow transition" 
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <Card.Img
        variant="top"
        src={`http://localhost:8080/api/product/${product.id}/image`}
        alt={product.name}
        style={{
          height: '240px',
          objectFit: 'cover'
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5">{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>

        <p className="text-secondary small flex-grow-1">{product.desc}</p>

        <div className="mb-3">
          <strong>Category:</strong> {product.category}
        </div>

        <h4 className="text-success mb-2">${parseFloat(product.price).toFixed(2)}</h4>

        <p className={`fw-bold ${product.quantity > 0 ? 'text-success' : 'text-danger'}`}>
          {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
        </p>
      </Card.Body>

      <Card.Footer className="bg-white border-0 pt-0">
        <Button
          variant="primary"
          className="w-100"
          onClick={(e) => {
            e.stopPropagation();        // Prevent navigating to details
            addToCart(product);
          }}
          disabled={product.quantity === 0}
        >
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;