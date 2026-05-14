import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../App'; // or import from config file
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

function AddProduct({ onProductAdded }) {
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        brand: '',
        price: '',
        category: '',
        releaseDate: '',
        available: true,
        quantity: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!imageFile) {
            setMessage({ text: 'Please select a product image', type: 'danger' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const formData = new FormData();

            // Important: Match your Spring Boot backend exactly
            formData.append('product', 
                new Blob([JSON.stringify(product)], { type: 'application/json' })
            );
            formData.append('imageFile', imageFile);

            const response = await axios.post(
                `${API_BASE_URL}/product`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            setMessage({ text: '✅ Product added successfully!', type: 'success' });

            // Reset form
            setProduct({
                name: '', desc: '', brand: '', price: '', category: '',
                releaseDate: '', available: true, quantity: ''
            });
            setImageFile(null);
            setImagePreview(null);

            // Refresh product list in Home page
            if (onProductAdded) {
                onProductAdded();
            }

        } catch (error) {
            console.error("Add Product Error:", error);
            const errorMsg = error.response?.data?.message || error.message;
            setMessage({ text: `❌ Failed to add product: ${errorMsg}`, type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="mb-4">Add New Product</h2>

                    {message.text && (
                        <Alert variant={message.type} className="mb-4">
                            {message.text}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name *</Form.Label>
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
                                    <Form.Label>Brand *</Form.Label>
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
                            <Form.Label>Description *</Form.Label>
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
                                    <Form.Label>Price ($) *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category *</Form.Label>
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
                                        <option value="Beauty">Beauty</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity *</Form.Label>
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
                                    <Form.Label>Release Date *</Form.Label>
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
                                    <Form.Label>Product Image *</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {imagePreview && (
                            <div className="mb-3">
                                <p className="mb-2">Image Preview:</p>
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    style={{ maxHeight: '200px', borderRadius: '8px' }}
                                />
                            </div>
                        )}

                        <Form.Check
                            type="checkbox"
                            label="Available for purchase"
                            name="available"
                            checked={product.available}
                            onChange={handleChange}
                            className="mb-4"
                        />

                        <Button 
                            variant="primary" 
                            type="submit" 
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddProduct;