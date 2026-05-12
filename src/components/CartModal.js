import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';

const CartModal = ({ show, onHide, cart, removeFromCart, updateCartQuantity }) => {
  const totalPrice = cart.reduce((sum, item) => 
    sum + parseFloat(item.price) * item.quantity, 0
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart ({cart.length} items)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="text-center py-5">Your cart is empty</p>
        ) : (
          <ListGroup variant="flush">
            {cart.map(item => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong>
                  <p className="mb-0 text-muted">${parseFloat(item.price).toFixed(2)} × {item.quantity}</p>
                </div>
                
                <div className="d-flex align-items-center gap-2">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-2 fw-bold">{item.quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    className="ms-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="me-auto">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="success" onClick={() => alert('Checkout functionality coming soon!')}>
          Proceed to Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;