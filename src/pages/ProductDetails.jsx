import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
      // Get all products and find the one (temporary solution)
      const res = await axios.get('http://localhost:8080/api/products');
      const foundProduct = res.data.find(p => p.id === parseInt(id));

      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error("Product not found");
      }
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

  const handleUpdate = () => {
    navigate(`/update-product/${id}`);
  };

  if (loading) return <h1 className="p-5">Loading product...</h1>;
  if (!product) return <h1 className="p-5">Product not found</h1>;

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <img
        src={`http://localhost:8080/api/product/${product.id}/image`}
        alt={product.name}
        className="w-80 h-80 object-cover rounded mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.desc}</p>   {/* ← backend uses 'desc' */}

      <div className="space-y-2 mb-6">
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
        <p className={product.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
          <strong>Stock:</strong> {product.quantity}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          Update Product
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;