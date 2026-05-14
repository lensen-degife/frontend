import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../App"; // or import from config

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
      const res = await axios.get(`${API_BASE_URL}/product/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/product/${id}`);
      alert("Product deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!product) return <div className="p-5 text-center">Product not found</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={`${API_BASE_URL}/product/${product.id}/image`} 
            alt={product.name} 
            className="img-fluid rounded" 
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">{product.brand} • {product.category}</p>
          <h2 className="text-success">${parseFloat(product.price).toFixed(2)}</h2>
          <p>{product.desc}</p>
          <p>Quantity: {product.quantity}</p>

          <div className="mt-4">
            <button className="btn btn-primary me-2" onClick={() => navigate(`/update-product/${id}`)}>
              Update
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;