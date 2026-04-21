import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderDetails from './pages/OrderDetails';
import OrderStats from './components/OrderStats';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Home />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/filter" element={<Home />} />
            <Route path="/stats" element={<OrderStats />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;
