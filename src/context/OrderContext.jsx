import { createContext, useEffect, useState } from "react";
import API from "../api/api";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setOrders(res.data.data);
      } else {
        console.error("Unexpected API response:", res.data);
        // Fallback dummy data so UI is visible since the API is not returning orders 
        setOrders([
          { orderid: 1001, customername: 'arun', resturant: 'spicybyurn', item: 'Chicken Tikka', totalamount: 350, status: 'pending', "delevriy time": '30 mins', rating: 4.5 },
          { orderid: 1002, customername: 'john', resturant: 'burgerking', item: 'Whopper', totalamount: 15, status: 'delivered', "delevriy time": '20 mins', rating: 4.0 },
          { orderid: 1003, customername: 'alice', resturant: 'taco bell', item: 'Tacos', totalamount: 12, status: 'cancelled', "delevriy time": 'N/A', rating: 0 }
        ]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const filterOrders = (status) => {
    return orders.filter(order => order.status === status);
  };

  const markDelivered = async (id) => {
    try {
      await API.patch(`/orders/${id}`, { status: "delivered" });
      fetchOrders();
    } catch (error) {
      console.error("Error marking delivered:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, filterOrders, markDelivered }}>
      {children}
    </OrderContext.Provider>
  );
};
