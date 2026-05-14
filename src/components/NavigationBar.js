import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = ({ searchTerm, setSearchTerm }) => {
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

          {/* Search Bar in Navbar */}
          <Form className="d-flex ms-auto" style={{ width: "420px", maxWidth: "100%" }}>
            <FormControl
              type="search"
              placeholder="Search by name, brand or category..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;