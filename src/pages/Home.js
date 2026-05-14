import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = ({ addToCart, refreshProducts: initialRefresh }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch all products or search results
    const fetchProducts = async (keyword = '') => {
        setLoading(true);
        try {
            let response;
            if (keyword.trim() !== '') {
                // Use search endpoint
                response = await axios.get(`http://localhost:8080/api/products/search?keyword=${keyword}`);
            } else {
                // Get all products
                response = await axios.get(`http://localhost:8080/api/products`);
            }
            setProducts(response.data);
        } catch (error) {
            console.error("Search error:", error);
            alert("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // Search when user types (with debounce)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts(searchTerm);
        }, 500); // 500ms delay

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Initial load
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/product/${id}`);
            alert("Product deleted successfully!");
            fetchProducts(searchTerm); // Refresh with current search
        } catch (error) {
            alert("Failed to delete product");
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Our Products</h2>
                
                <div className="d-flex gap-3 align-items-center">
                    <Form.Control
                        type="text"
                        placeholder="Search products by name, brand or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '350px' }}
                    />

                    <button 
                        className="btn btn-success"
                        onClick={() => fetchProducts(searchTerm)}
                    >
                        🔄 Refresh
                    </button>

                    <button 
                        className="btn btn-primary"
                        onClick={() => window.location.href = '/add-product'}
                    >
                        + Add Product
                    </button>
                </div>
            </div>

            {loading && <p className="text-center">Searching...</p>}

            <Row>
                {products.length === 0 && !loading ? (
                    <Col>
                        <p className="text-center fs-4 text-muted mt-5">
                            {searchTerm ? `No results found for "${searchTerm}"` : "No products available"}
                        </p>
                    </Col>
                ) : (
                    products.map((product) => (
                        <Col md={6} lg={4} xl={3} className="mb-4" key={product.id}>
                            <ProductCard 
                                product={product} 
                                addToCart={addToCart}
                                onDelete={handleDelete}
                            />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Home;