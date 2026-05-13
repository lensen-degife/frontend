import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '', brand: '', desc: '', price: '', category: '',
    quantity: '', releaseDate: '', available: true
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ text: '', variant: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/product/${id}`);
      setProduct({
        name: res.data.name || '',
        brand: res.data.brand || '',
        desc: res.data.desc || '',
        price: res.data.price || '',
        category: res.data.category || '',
        quantity: res.data.quantity || '',
        releaseDate: res.data.releaseDate ? res.data.releaseDate.split('T')[0] : '',
        available: res.data.available ?? true,
      });
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Failed to load product', variant: 'danger' });
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', variant: '' });

    const formData = new FormData();

    const productData = {
      name: product.name,
      brand: product.brand,
      desc: product.desc,
      price: Number(product.price),
      category: product.category,
      quantity: Number(product.quantity),
      available: product.available,
      releaseDate: product.releaseDate || null
    };

    formData.append('product', JSON.stringify(productData));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',   // Keep this line
        },
        // Important: Tell Axios not to transform the data
        transformRequest: (data) => data
      });

      setMessage({ text: '✅ Product updated successfully!', variant: 'success' });
      setTimeout(() => navigate(`/products/${id}`), 1500);

    } catch (error) {
      console.error("Full Error:", error.response || error);
      setMessage({ 
        text: error.response?.data?.message || 'Failed to update product', 
        variant: 'danger' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Container className="mt-5 text-center"><h3>Loading...</h3></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Update Product</h2>

      {message.text && <Alert variant={message.variant}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Your form fields remain the same */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" name="brand" value={product.brand} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="desc" value={product.desc} onChange={handleChange} required />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={product.category} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Release Date</Form.Label>
          <Form.Control type="date" name="releaseDate" value={product.releaseDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>New Image (Optional)</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Available"
          name="available"
          checked={product.available}
          onChange={handleChange}
          className="mb-4"
        />

        <div className="d-flex gap-3">
          <Button variant="primary" type="submit" disabled={loading} size="lg">
            {loading ? "Updating..." : "Update Product"}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateProduct;