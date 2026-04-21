import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to load order:", err);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading order details...</div>;
  if (!order) return <div style={{ padding: '20px' }}>Order not found.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/"><button style={{ marginBottom: '20px' }}>&larr; Back to Dashboard</button></Link>
      <h2>Order Details: #{order.id || order._id}</h2>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <div style={{ margin: '20px 0' }}>
        <h3>Items:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {order.items && order.items.map((item, index) => (
            <li key={index}>{item.name || item}</li>
          ))}
        </ul>
      </div>
      <h3>Total Amount: ${order.total?.toFixed(2)}</h3>
    </div>
  );
};

export default OrderDetails;
