import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const OrderStats = () => {
  const { orders } = useContext(OrderContext);

  const safeOrders = orders || [];
  const total = safeOrders.length;
  const delivered = safeOrders.filter(o => o.status === "delivered").length;
  const cancelled = safeOrders.filter(o => o.status === "cancelled").length;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Stats</h2>
      <p>Total Orders: {total}</p>
      <p>Delivered: {delivered}</p>
      <p>Cancelled: {cancelled}</p>
    </div>
  );
};

export default OrderStats;
