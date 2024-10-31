import React from 'react';

const ItemTable = ({ order }) => {
    return (
        <div className="w-full my-8 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Item List</h3>
            <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">No</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Item Name</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Quantity</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.OrderDetails.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-4">{index + 1}</td>
                            <td className="px-4 py-4 flex items-center">
                                <img
                                    src={`/images/${item.Product.image.split(',')[0]}`}
                                    alt="product"
                                    className="object-cover w-14 h-14 rounded" />
                                <div className='ml-2'>
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-gray-500 text-sm">{item.Product.product_description}</div>
                                </div>
                            </td>
                            <td className="px-4 py-4 font-semibold">{item.quantity}</td>
                            <td className="px-4 py-4">${item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemTable;
