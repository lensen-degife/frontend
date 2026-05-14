import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Pencil, Trash, Eye } from 'react-bootstrap-icons';   // ← Fixed

const ProductCard = ({ product, addToCart, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow transition-all">
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
        <Card.Title className="mb-1">{product.name}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{product.brand}</Card.Subtitle>

        <p className="text-secondary small mb-3" 
           style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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

        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            className="flex-fill"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Eye size={16} className="me-1" /> Details
          </Button>

          <Button
            variant="outline-primary"
            size="sm"
            className="flex-fill"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/update-product/${product.id}`);
            }}
          >
            <Pencil size={16} className="me-1" /> Edit
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            className="flex-fill"
            onClick={handleDelete}
          >
            <Trash size={16} className="me-1" /> Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;