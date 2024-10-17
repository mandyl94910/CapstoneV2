import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import axios from 'axios';
  

const OrderList = ( {activeTab, orders} ) => {

  const filteredOrders = orders.filter(order => {
      if (activeTab === 'allOrders') return true;
      if (activeTab === 'shipped') return order.status === 'shipped';
      if (activeTab === 'completed') return order.status === 'completed';
      if (activeTab === 'cancelled') return order.status === 'cancelled';
  });

  return (
    <div className="container ml-4 py-4 px-6">
      {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))
      ) : (
        <p>No orders found.</p>
      )}
    
    </div>
  );
};

export default OrderList;
