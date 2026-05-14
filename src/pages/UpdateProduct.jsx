import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

function UpdateProduct({ onProductUpdated }) {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [currentImage, setCurrentImage] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    // Fetch existing product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/${id}`);
                const p = response.data;
                setProduct({
                    name: p.name || '',
                    desc: p.desc || '',
                    brand: p.brand || '',
                    price: p.price || '',
                    category: p.category || '',
                    releaseDate: p.releaseDate ? p.releaseDate.split('T')[0] : '',
                    available: p.available || false,
                    quantity: p.quantity || ''
                });
                setCurrentImage(`http://localhost:8080/api/product/${id}/image`);
            } catch (error) {
                setMessage({ text: 'Failed to load product details', type: 'danger' });
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const formData = new FormData();

            formData.append('product',
                new Blob([JSON.stringify(product)], { type: 'application/json' })
            );

            if (imageFile) {
                formData.append('imageFile', imageFile);
            }

            // ✅ IMPORTANT: Do NOT set Content-Type header
            await axios.put(`http://localhost:8080/api/product/${id}`, formData);

            setMessage({ text: '✅ Product updated successfully!', type: 'success' });

            if (onProductUpdated) onProductUpdated();

            // Redirect after short delay
            setTimeout(() => navigate('/'), 1500);

        } catch (error) {
            console.error("Full Update Error:", error);
            const errorMsg = error.response?.data?.message || error.message;
            setMessage({ 
                text: `❌ Update failed: ${errorMsg}`, 
                type: 'danger' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="mb-4">Update Product</h2>

                    {message.text && <Alert variant={message.type}>{message.text}</Alert>}

                    {currentImage && !imagePreview && (
                        <div className="mb-3">
                            <p>Current Image:</p>
                            <img src={currentImage} alt="Current" style={{ maxHeight: '180px' }} />
                        </div>
                    )}

                    {imagePreview && (
                        <div className="mb-3">
                            <p>New Image Preview:</p>
                            <img src={imagePreview} alt="Preview" style={{ maxHeight: '180px' }} />
                        </div>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {/* Same form fields as AddProduct */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name *</Form.Label>
                                    <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand *</Form.Label>
                                    <Form.Control type="text" name="brand" value={product.brand} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control as="textarea" rows={3} name="desc" value={product.desc} onChange={handleChange} required />
                        </Form.Group>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price *</Form.Label>
                                    <Form.Control type="number" step="0.01" name="price" value={product.price} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category *</Form.Label>
                                    <Form.Select name="category" value={product.category} onChange={handleChange} required>
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
                                    <Form.Label>Quantity *</Form.Label>
                                    <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Release Date *</Form.Label>
                                    <Form.Control type="date" name="releaseDate" value={product.releaseDate} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>New Image (optional)</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
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

                        <Button variant="success" type="submit" size="lg" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Product'}
                        </Button>

                        <Button variant="secondary" className="ms-3" onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default UpdateProduct;