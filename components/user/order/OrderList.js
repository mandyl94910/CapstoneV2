import React from 'react';
import OrderCard from './OrderCard';

// hardcode orders
const orders = [
    {
      id: 1,
      customer_id: 101,
      address_id: 202,
      total: 258.00,
      total_tax: 8.00,
      status: 'completed',
      order_date: '2024-10-01',
      ship_date: '2024-10-02',
      shipping_method: 'Express',
      tracking_number: 'TRK123456789',
      complete_date: '2024-10-05',
      order_details: [
        {
          id: 1,
          order_id: 1,
          product_id: 301,
          quantity: 2,
        },
        {
          id: 2,
          order_id: 1,
          product_id: 302,
          quantity: 1,
        }
      ]
    },
    {
      id: 2,
      customer_id: 102,
      address_id: 203,
      total: 64.80,
      total_tax: 0.00,
      status: 'shipped',
      order_date: '2024-10-05',
      ship_date: '2024-10-06',
      shipping_method: 'Standard',
      tracking_number: 'TRK987654321',
      complete_date: null,
      order_details: [
        {
          id: 3,
          order_id: 2,
          product_id: 303,
          quantity: 1,
        }
      ]
    }
  ];
  

const OrderList = ( {activeTab} ) => {

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
