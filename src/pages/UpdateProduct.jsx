import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    desc: '',
    brand: '',
    price: '',
    category: '',
    quantity: '',
    releaseDate: '',
    available: true
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch current product data
  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      const found = res.data.find(p => p.id === parseInt(id));

      if (found) {
        setProduct({
          name: found.name || '',
          desc: found.desc || '',
          brand: found.brand || '',
          price: found.price || '',
          category: found.category || '',
          quantity: found.quantity || '',
          releaseDate: found.releaseDate || '',
          available: found.available || true
        });
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to load product data');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('brand', product.brand);
    formData.append('desc', product.desc);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('quantity', product.quantity);
    formData.append('available', product.available);

    if (product.releaseDate) {
      formData.append('releaseDate', product.releaseDate);
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage('Product updated successfully!');
      setTimeout(() => navigate(`/products/${id}`), 1500);
    } catch (error) {
      console.error(error);
      setMessage('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Container className="mt-5"><h3>Loading product data...</h3></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Update Product</h2>

      {message && <Alert variant={message.includes('success') ? "success" : "danger"}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="desc"
            value={product.desc}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="releaseDate"
                value={product.releaseDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>New Product Image (optional)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Check
          type="checkbox"
          label="Available"
          name="available"
          checked={product.available}
          onChange={handleChange}
          className="mb-4"
        />

        <div className="d-flex gap-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateProduct;