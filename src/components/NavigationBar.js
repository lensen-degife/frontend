import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">

      <Container>

        <Navbar.Brand as={Link} to="/">
          E-Commerce
        </Navbar.Brand>

        <Nav className="ms-auto">

          <Button
            as={Link}
            to="/add-product"
            variant="success"
          >
            Add Product
          </Button>

        </Nav>

      </Container>

    </Navbar>
  );
};

export default NavigationBar;