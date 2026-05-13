import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      alert("Product deleted");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-product/${id}`);
  };

  if (!product) return <h1>Loading...</h1>;

  return (
    <div className="p-5">
      <img
        src={product.image}
        alt={product.name}
        className="w-72"
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>${product.price}</h2>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;