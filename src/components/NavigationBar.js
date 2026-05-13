import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          🛒 E-Commerce
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/add-product"
            >
              Add Product
            </Nav.Link>
          </Nav>

          {/* Optional: Future Cart Button */}
          {/* 
          <Nav>
            <Button variant="outline-light" className="me-2">
              Cart (0)
            </Button>
          </Nav>
          */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;