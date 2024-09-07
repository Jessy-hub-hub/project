import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="/product/:productName" element={<ProductDetails />} />
    </Routes>
  </Router>
);

export default App;