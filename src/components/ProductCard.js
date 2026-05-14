import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm hover-shadow transition-all">
      
      {/* Clickable Image Area */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ 
          height: '260px',           // Increased a bit for better look
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img
            src={`http://localhost:8080/api/product/${product.id}/image`}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',     // ← Changed from 'cover'
              objectPosition: 'center',
              padding: '8px'            // Optional: gives breathing space
            }}
          />
        </div>
      </div>

      <Card.Body>
        <Card.Title className="mb-1">{product.name}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{product.brand}</Card.Subtitle>

        <p className="text-secondary small mb-3"
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}>
          {product.desc}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="text-success mb-0">
            ${parseFloat(product.price).toFixed(2)}
          </h4>
          <Badge
            bg={product.available && product.quantity > 0 ? "success" : "danger"}
          >
            {product.quantity} left
          </Badge>
        </div>

        <small className="text-muted">Category: {product.category}</small>
      </Card.Body>

      <Card.Footer className="bg-white border-0 pt-0">
        <Button
          variant="primary"
          className="w-100 mb-2"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          disabled={product.quantity <= 0}
        >
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;