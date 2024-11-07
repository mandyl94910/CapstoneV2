// pages/user-profile/order-detail/[orderId].js
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from "../../../components/common/Header";
import OrderProgress from '../../../components/user/order/OrderProgess';
import OrderMap from '../../../components/user/order/OrderMap';
import OrderDetailTable from '../../../components/user/order/OrderDetailTable';
import { FaCircleExclamation, FaLocationDot } from 'react-icons/fa6';

/**
 * Helped by chatGPT
 * Fetches and displays detailed information about a specific order using its ID
 * It retrieves order data and tracking information from the server
 * It includes a progress bar for order status and a table displaying order details
 */
export default function OrderDetail() {
    const router = useRouter();
    const { orderId } = router.query;
    const [order, setOrder] = useState(null);
    const [trackingData, setTrackingData] = useState(null);

    // Get order info
    useEffect(() => {
        if (!orderId) return;
        // 延迟加载（Debounce）和重试机制
        const fetchOrder = async (retryCount = 3 ) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/order/order-detail/${orderId}`);
                setOrder(response.data);
                console.log('order fetched', response.data);
            } catch (error) {
                if (retryCount > 0) {
                    setTimeout(() => fetchOrder(retryCount - 1), 1000); // 重试请求，延迟1秒
                } else {
                    console.error("Error fetching order:", error);
                }
            }
        };

        fetchOrder();
    }, [orderId]);


    // Get tracking info
    useEffect(() => {
        if (order && order.tracking_number && order.shipping_method) {
            console.log('shipping_method: ', order.shipping_method);
            async function fetchTrackingData() {
            try {
                const response = await axios.get(`http://localhost:3001/api/shipping/status`, {
                    params: {
                        tracking_number: order.tracking_number,
                        shipping_method: order.shipping_method,
                    },
                });
                console.log('Tracking API response:', response.data); // 检查完整的 API 响应
                setTrackingData(response.data.shipments[0]);
                
            } catch (error) {
                console.error("Error fetching tracking data:", error);
            }
            }
            fetchTrackingData();
        }
    },[order]);


    if (!order) return <p>Loading...</p>;
    if (!trackingData) {
        return <p>Loading tracking data...</p>;
    }

    // 从trackingData中提取不同的时间戳
    const timestamps = {
        orderDate: order.order_date,
        shippedDate: order.ship_date,
        shipment_info_received: trackingData?.events.find(event => event.status === "SD")?.timestamp,
        transit: trackingData?.events.find(event => event.status === "PL")?.timestamp,
        delivered: trackingData?.events.find(event => event.statusCode === "delivered")?.timestamp
    };

    // 确保从 trackingData 中提取了具体字段
    const { origin, destination, events, status, details } = trackingData;
    const statusDescription = status?.description || 'N/A';
    const statusTimestamp = status?.timestamp ? new Date(status.timestamp).toLocaleString() : 'N/A';
    const statusLocation = status?.location?.address?.addressLocality || 'N/A';

    return (
        <>
            <Header />
            <div className='container mx-auto my-8 px-16 min-w-[800px]'>
                <div className="bg-white p-6 border shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Order ID: {orderId}</h1>
                    <hr/>
                    <div className="flex justify-center w-full px-10">
                        <OrderProgress 
                            status={order.status} 
                            timestamps={timestamps} />
                    </div> 
                    {/* Status and Location */}
                    <hr/>
                    <div className='flex justify-between'>
                        {/* status info */}
                        <div className="p-6 mb-6">
                            <div className='flex text-slate-500 items-center'>
                                <FaCircleExclamation className='w-6 h-6 pr-2'/>
                                <p>Status</p>
                            </div>
                            <h2 className="text-lg font-bold text-yellow-600">Status: {statusDescription}</h2>
                            <p className="text-gray-700">Current Location: {statusLocation}</p>
                            <p className="text-gray-500 text-sm">Last Update: {statusTimestamp}</p>
                        </div>

                        {/* Location info */}
                        <div className="bg-white border shadow-md rounded-lg p-6 my-6">
                            <div className='flex text-slate-500 items-center mb-2'>
                                <FaLocationDot className='w-6 h-6 pr-2'/>
                                <p>Location</p>
                            </div>
                            <p className="text-gray-700 text-sm">Current Location: </p>
                            <p className='font-bold mb-2 text-blue-500'>{statusLocation}</p>
                            <p className="text-gray-700 text-sm">Pick Up Location: </p>
                            <p className='font-bold mb-2'>{origin?.address?.addressLocality || 'N/A'}</p>
                            <p className="text-gray-700 text-sm">Destination: </p>
                            <p className='font-bold mb-2'>{destination?.address?.addressLocality || 'N/A'}</p>
                            <p className="text-gray-700 text-sm">Service: </p>
                            <p className="font-bold mb-2">{trackingData.service || 'N/A'}</p>
                        </div>
                    </div>
                    
                    <OrderDetailTable order={order}/>
                    {/* Proof of Delivery (if available) */}
                    {/* {details?.proofOfDelivery && (
                    <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Proof of Delivery</h3>
                        <a
                        href={details.proofOfDelivery.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                        >
                        View Proof of Delivery Document
                        </a>
                    </div>
                    )} */}

                    {/* 追踪事件部分 */}
                    <hr/>
                    <div className="p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tracking Events</h3>
                        <ul className="space-y-4">
                            {events.map((event, index) => (
                            <li key={index} className="p-4 border rounded-md">
                                <p className="font-semibold text-gray-800">
                                {event.timestamp ? new Date(event.timestamp).toLocaleString() : 'N/A'}
                                </p>
                                <p className="text-gray-700">
                                Location: {event.location?.address?.addressLocality || 'N/A'}
                                </p>
                                <p className="text-gray-600">
                                Status: {event.description || 'N/A'}
                                </p>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white border rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Map</h3>
                        <p className='text-green-600'>// Comment the map component so that it won't make too many requests...</p>
                        {/* {location && <OrderMap location={statusLocation} />} */}
                    </div>
                </div>
            </div>
        </>
    );
}
