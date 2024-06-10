import CartItem from './components/CartItem/CartItem';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import productsData from './products.json';
import React, { useState, useEffect } from 'react';
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        // setProducts(productsData);
        const response = await fetch('http://localhost:4000/api/products'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProducts(result);
      }
      catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);
  const handleRemoveItem = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CartItem items={products} />} />
          <Route path="/cart" element={<Cart items={products} onRemoveItem={handleRemoveItem} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
