import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PortfolioCategory from './pages/PortfolioCategory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:category" element={<PortfolioCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
