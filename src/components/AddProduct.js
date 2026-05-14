import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';   // or from App.js
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        brand: '',
        price: 0,
        category: '',
        releaseDate: '',
        available: true,
        quantity: 0
    });

    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

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

        if (!imageFile) {
            setMessage('Please select an image');
            return;
        }

        try {
            const formData = new FormData();

            formData.append(
                'product',
                new Blob([JSON.stringify(product)], { type: 'application/json' })
            );

            formData.append('imageFile', imageFile);

            const response = await axios.post(
                'http://localhost:8080/api/product',   // direct URL for now
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            setMessage('✅ Product added successfully!');

            // Reset form
            setProduct({
                name: '', desc: '', brand: '', price: 0, category: '',
                releaseDate: '', available: true, quantity: 0
            });
            setImageFile(null);

        } catch (error) {
            console.error("Add Product Error:", error);
            setMessage('Failed: ' + (error.response?.data || error.message));
        }
    };


    return (
        <Container className="mt-4">
            <h2 className="mb-4">Add Product</h2>

            {message && <Alert variant="info">{message}</Alert>}

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
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                required
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
                    className="mb-3"
                />

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>
        </Container>
    );
}

export default AddProduct;