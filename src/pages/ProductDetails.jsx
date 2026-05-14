import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { ArrowLeft, Edit, Trash2 } from 'react-bootstrap-icons';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${id}`);
            setProduct(response.data);
        } catch (err) {
            setError("Failed to load product details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        setDeleteLoading(true);
        try {
            await axios.delete(`http://localhost:8080/api/product/${id}`);
            alert("Product deleted successfully!");
            navigate('/'); // Go back to home
        } catch (err) {
            alert("Failed to delete product");
            console.error(err);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) return <h3 className="text-center mt-5">Loading product...</h3>;
    if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;
    if (!product) return <h3>Product not found</h3>;

    return (
        <Container className="mt-4">
            <Button 
                variant="light" 
                className="mb-4"
                onClick={() => navigate('/')}
            >
                <ArrowLeft /> Back to Products
            </Button>

            <Card className="shadow">
                <Row className="g-0">
                    {/* Image Section */}
                    <Col md={5}>
                        <div className="p-4">
                            <img
                                src={`http://localhost:8080/api/product/${id}/image`}
                                alt={product.name}
                                className="img-fluid rounded"
                                style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }}
                            />
                        </div>
                    </Col>

                    {/* Details Section */}
                    <Col md={7}>
                        <Card.Body>
                            <Card.Title className="fs-2 fw-bold">{product.name}</Card.Title>
                            <Card.Subtitle className="text-muted fs-5 mb-3">
                                {product.brand}
                            </Card.Subtitle>

                            <h3 className="text-success mb-4">
                                ${parseFloat(product.price).toFixed(2)}
                            </h3>

                            <div className="mb-4">
                                <strong>Category:</strong> {product.category}
                            </div>

                            <div className="mb-4">
                                <strong>Status:</strong>{' '}
                                <span className={`badge ${product.available ? 'bg-success' : 'bg-danger'}`}>
                                    {product.available ? 'Available' : 'Out of Stock'}
                                </span>
                            </div>

                            <div className="mb-4">
                                <strong>Quantity:</strong> {product.quantity} units
                            </div>

                            <div className="mb-4">
                                <strong>Release Date:</strong>{' '}
                                {new Date(product.releaseDate).toLocaleDateString()}
                            </div>

                            <div>
                                <strong>Description:</strong>
                                <p className="mt-2 text-secondary" style={{ lineHeight: '1.7' }}>
                                    {product.desc}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-3 mt-5">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => navigate(`/update-product/${id}`)}
                                >
                                    <Edit className="me-2" />
                                    Update Product
                                </Button>

                                <Button
                                    variant="danger"
                                    size="lg"
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                >
                                    <Trash2 className="me-2" />
                                    {deleteLoading ? 'Deleting...' : 'Delete Product'}
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default ProductDetails;