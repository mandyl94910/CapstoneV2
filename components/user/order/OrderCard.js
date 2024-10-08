import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 min-w-[700px] max-w-[1000px]">
        {/* order info*/}
        <div className="flex justify-between items-center mb-2">
            <div>
            <span>{order.order_date}</span>
            <span className="ml-4 text-gray-600">Order id: {order.id}</span>
            </div>
            <div className='rounded px-2 border-gray-400 border-2 text-gray-500'>{order.status}</div>
        </div>
        <hr className='mb-2'/>
        {/* products in order */}
        <div className='flex justify-between'>
            <div>
                {order.order_details.map((product, index) => (
                    <div key={index} className="flex mb-4">
                        <div className="flex-shrink-0 w-20 h-20">
                            <img src="/images/product/1/example.webp" alt="product" className="object-cover w-full h-full rounded" />
                        </div>
                        <div className="ml-4 w-60">
                            <div className="text-sm">Product name</div>
                            <div className="text-gray-600 text-sm">
                            product description
                            </div>
                        </div>
                        <div className="text-gray-800">$99.9</div>
                        <div className='pl-16 font-bold'>x{product.quantity}</div>
                    </div>
                ))}
            </div>
        
            {/* total price and tax for order */}
            <div>
                <div className='pr-6 text-red-600 font-bold text-right'>Total: ${order.total}</div>
                <div className="pr-6 text-gray-500 text-sm">total tax: ${order.total_tax}</div>
            </div>
        </div>
        
        <hr/>
        {/* operate orders */}
        <div className="flex justify-end items-center mt-3">
            
            <div className="flex items-center space-x-2">
            <button className="bg-blue-500 text-white py-1 px-3 rounded">Review</button>
            <button className="bg-gray-200 text-gray-700 py-1 px-3 rounded">Order Detail</button>
            </div>
        </div>
    </div>
  );
};

export default OrderCard;
