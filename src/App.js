import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddProduct from './components/AddProduct';
import NavigationBar from './components/NavigationBar';
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";

export const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <BrowserRouter>
      <NavigationBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
        <Route 
          path="/" 
          element={<Home searchTerm={searchTerm} addToCart={addToCart} />} 
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;