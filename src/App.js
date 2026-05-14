import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddProduct from './components/AddProduct';
import NavigationBar from './components/NavigationBar';
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";

export const API_BASE_URL = 'http://localhost:8080/api'; // ← Make sure your backend runs on 8080

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart!`);
    // TODO: Use Context/Redux for real cart
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} refreshProducts={fetchProducts} />} />
        <Route path="/add-product" element={<AddProduct onProductAdded={fetchProducts} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/update-product/:id" element={<UpdateProduct onProductUpdated={fetchProducts} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;