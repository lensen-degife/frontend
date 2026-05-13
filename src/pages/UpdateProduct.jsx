import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost:5000/products/${id}`
    );

    setFormData(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/products/${id}`,
        formData
      );

      alert("Product updated");

      navigate(`/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-5"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-green-500 text-white p-2"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateProduct;