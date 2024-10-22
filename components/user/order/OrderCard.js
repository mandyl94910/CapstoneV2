import Link from 'next/link';
import React from 'react';
import { FaX } from 'react-icons/fa6';

/**
 * Helped with chatGPT
 * Create a card to display information of an order including orderId, orderStatus, 
 *      and all prodcuts within this order through the assosiated model OrderDetails
 * Calculate the total price for the order through the price and quantity in each orderDetail
 * Display all information in a human-readable format
 */
const OrderCard = ({ order, customerId }) => {
    // Function to format date
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString();
    };

    const calculateTotalPrice = (subtotal, tax) => {
        const subF = parseFloat(subtotal) || 0;
        const taxF = parseFloat(tax) || 0;
        const total = Math.round((subF + taxF) * 100) / 100;
        return total.toFixed(2);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4 min-w-[700px] max-w-[1000px]">
            {/* Order Info */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <span>{formatDateTime(order.order_date)}</span>
                    <span className="ml-4 text-gray-600">Order id: {order.id}</span>
                </div>
                <div className='rounded px-2 border-gray-400 border-2 text-gray-500'>{order.status}</div>
            </div>
            <hr className='mb-2' />

            {/* Products in Order */}
            <div className='flex justify-between'>
                <div>
                    {order.OrderDetails.map((order_detail, index) => (
                        <div key={index} className="flex items-center mb-4">
                            <div className="flex-shrink-0 w-20 h-20">
                                <Link href={`/product/${order_detail.product_id}`}>
                                    <img
                                        src={`/images/${order_detail.Product.image.split(',')[0]}`}
                                        alt="product"
                                        className="object-cover w-full h-full rounded" />
                                </Link>
                            </div>
                            <div className="ml-4 w-72">
                                <Link href={`/product/${order_detail.product_id}`}>
                                    <div className="text-sm text-blue-500 hover:underline">{order_detail.name}</div>
                                </Link>
                                <div className="text-gray-600 text-sm">Product properties....hardcode here</div>
                            </div>
                            <div className="text-gray-800 w-16">{order_detail.price}</div>
                            <div className='flex items-center px-6'>
                                <FaX />
                                <p className='text-xl font-semibold'>{order_detail.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Price and Tax for Order */}
                <div className="flex justify-end flex-col items-end">
                    <div className='pr-6 text-red-600 font-bold text-right'>
                        SubTotal: ${parseFloat(order.total).toFixed(2)}
                    </div>
                    <div className="pr-6 text-gray-500 text-sm mb-3">
                        Total tax: ${parseFloat(order.total_tax).toFixed(2)}
                    </div>
                    <div className="pr-6 font-bold">
                        Total: ${calculateTotalPrice(order.total, order.total_tax)}
                    </div>
                </div>
            </div>

            <hr />
            {/* Operate Orders */}
            <div className="flex justify-end items-center mt-3">
                <div className="flex items-center space-x-2">
                    <Link href={{
                        pathname: '/user-profile/review',
                        query: { 
                            orderData: JSON.stringify(order),
                            customerId: customerId
                         } // 将订单信息作为查询参数传递
                    }}>
                        <button className="bg-blue-500 text-white py-1 px-3 rounded">Review</button>
                    </Link>
                    <button className="bg-gray-200 text-gray-700 py-1 px-3 rounded">Order Detail</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
