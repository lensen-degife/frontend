import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import AddProduct from './components/AddProduct';
import NavigationBar from './components/NavigationBar';
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await axios.get(
        'http://localhost:8080/api/products'
      );

      setProducts(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    console.log(product);
  };

  return (

    <BrowserRouter>

      <NavigationBar />

      <Routes>

        <Route
          path="/"
          element={
            <Home
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route
          path="/update-product/:id"
          element={<UpdateProduct />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;