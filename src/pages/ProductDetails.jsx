import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/product/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      alert("Product deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (!product) return <h3 className="text-center mt-5">Product not found</h3>;

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Row className="g-0">
          <Col md={5}>
            <img
              src={`http://localhost:8080/api/product/${product.id}/image`}
              alt={product.name}
              className="img-fluid h-100"
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col md={7}>
            <Card.Body className="p-5">
              <h2 className="mb-3">{product.name}</h2>
              <h4 className="text-success mb-4">${product.price}</h4>
              
              <p className="lead">{product.desc}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>

              <div className="mt-4">
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="me-3"
                  onClick={() => navigate(`/update-product/${id}`)}
                >
                  Update Product
                </Button>
                <Button 
                  variant="danger" 
                  size="lg" 
                  onClick={handleDelete}
                >
                  Delete Product
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetails;