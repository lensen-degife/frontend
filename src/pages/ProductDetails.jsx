import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

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
      const res = await axios.get('http://localhost:8080/api/products');
      const foundProduct = res.data.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
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

  if (loading) return <h3 className="text-center mt-5">Loading product...</h3>;
  if (!product) return <h3 className="text-center mt-5 text-danger">Product not found</h3>;

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Row className="g-0">
          <Col md={5}>
            <img
              src={`http://localhost:8080/api/product/${product.id}/image`}
              alt={product.name}
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover", minHeight: "400px" }}
            />
          </Col>

          <Col md={7}>
            <Card.Body className="p-5">
              <Card.Title className="display-6 fw-bold">{product.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted fs-5">{product.brand}</Card.Subtitle>

              <h3 className="text-success mb-4">${parseFloat(product.price).toFixed(2)}</h3>

              <p className="lead mb-4">{product.desc}</p>

              <div className="mb-4">
                <strong>Category:</strong> {product.category}<br />
                <strong>Stock:</strong> 
                <span className={product.quantity > 0 ? "text-success" : "text-danger"}>
                  {" "}{product.quantity} units
                </span>
              </div>

              <div className="d-flex gap-3 mt-5">
                <Button 
                  variant="warning" 
                  size="lg"
                  onClick={() => navigate(`/update-product/${id}`)}
                  className="px-5"
                >
                  ✏️ Update Product
                </Button>

                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={handleDelete}
                  className="px-5"
                >
                  🗑️ Delete Product
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