import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <div 
        onClick={() => navigate(`/products/${product.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <Card.Img
          variant="top"
          src={`http://localhost:8080/api/product/${product.id}/image`}
          alt={product.name}
          style={{ height: '220px', objectFit: 'cover' }}
        />
      </div>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>

        <p className="text-secondary small">{product.desc}</p>

        <div className="mb-2">
          <strong>Category:</strong> {product.category}
        </div>

        <h4 className="text-success mb-2">${parseFloat(product.price).toFixed(2)}</h4>

        <p className={`fw-bold ${product.quantity > 0 ? 'text-success' : 'text-danger'}`}>
          {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
        </p>
      </Card.Body>

      <Card.Footer className="bg-white">
        <Button
          variant="primary"
          className="w-100 mb-2"
          onClick={() => addToCart(product)}
          disabled={product.quantity === 0}
        >
          Add to Cart
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          className="w-100"
          onClick={() => navigate(`/update-product/${product.id}`)}
        >
          Edit
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;