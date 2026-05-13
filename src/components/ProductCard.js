import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="h-100 shadow-sm">

      <Card.Img
        variant="top"
        src={`http://localhost:8080/api/product/${product.id}/image`}
        alt={product.name}
        style={{
          height: '220px',
          objectFit: 'cover'
        }}
      />

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>

        <p className="text-secondary small">{product.desc}</p>

        <div className="mb-3">
          <strong>Category:</strong> {product.category}
        </div>

        <h4 className="text-success">${parseFloat(product.price).toFixed(2)}</h4>

        <p className={`fw-bold ${product.quantity > 0 ? 'text-success' : 'text-danger'}`}>
          {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
        </p>
      </Card.Body>

      <Card.Footer>
        <Button
          variant="primary"
          className="w-100"
          onClick={() => addToCart(product)}
          disabled={product.quantity === 0}
        >
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;