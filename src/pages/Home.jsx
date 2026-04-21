import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import OrderStats from '../components/OrderStats';
import { Link } from 'react-router-dom';

const Home = () => {
  const { orders, filterOrders, markDelivered } = useContext(OrderContext);
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' ? orders : filterOrders(filter);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Order Dashboard</h1>
      <OrderStats />
      
      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => {
          const id = order.orderid || order.id || order._id;
          return (
            <div key={id} style={{ marginBottom: '20px' }}>
              <pre style={{ margin: 0 }}>
{`{
"order id": ${order.orderid || id},
"customername": "${order.customername || order.customer || ''}",
"resturant": "${order.resturant || order.restuent || ''}",
"item": "${order.item || ''}",
"totalamount": ${order.totalamount || order.total || 0},
"status": "${order.status || ''}",
"delevriy time": "${order["delevriy time"] || ''}",
"rating": ${order.rating || 0}
}`}
              </pre>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {order.status === 'pending' && (
                  <button onClick={() => markDelivered(id)}>
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filteredOrders.length === 0 && <p>No orders found.</p>}
      </div>
    </div>
  );
};

export default Home;
