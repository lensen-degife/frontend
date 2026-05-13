import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

  const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm cursor-pointer" 
          onClick={() => navigate(`/products/${product.id}`)}>
      {/* ... rest of your card code ... */}

      <Card.Footer>
        <Button
          variant="primary"
          className="w-100"
          onClick={(e) => {
            e.stopPropagation();        // ← Important!
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