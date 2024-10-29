// pages/user-profile/order-detail/[orderId].js
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from "../../../components/common/Header";
import OrderProgress from '../../../components/user/order/OrderProgess';
import OrderMap from '../../../components/user/order/OrderMap';

export default function OrderDetail() {
    const router = useRouter();
    const { orderId } = router.query;
    const [order, setOrder] = useState(null);
    const [trackingData, setTrackingData] = useState(null);

    // Get order info
    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            const response = await axios.get(`http://localhost:3001/api/get-orders-for-admin/${orderId}`);
            setOrder(response.data);
        };

        fetchOrder();
    }, [orderId]);


    // Get tracking info
    useEffect(() => {
        if (order && order.tracking_number && order.shipping_method) {
            async function fetchTrackingData() {
            try {
                const response = await axios.get(`http://localhost:3001/api/shipping/status`, {
                params: {
                    tracking_number: order.tracking_number,
                    shipping_method: order.shipping_method,
                },
                });
                
                setTrackingData(response.data.shipments[0]);
                console.log('Response data:', response.data.shipments[0]);
            } catch (error) {
                console.error("Error fetching tracking data:", error);
            }
            }
            fetchTrackingData();
        }
    },[order]);

    useEffect(() => {
        if (trackingData) {
            console.log('TrackingData updated: ', trackingData);
        }
        }, [trackingData]);

        if (!order) return <p>Loading...</p>;
        if (!trackingData) {
        return <p>Loading tracking data...</p>;
    }

    // 确保从 trackingData 中提取了具体字段
    const { origin, destination, events, status, details } = trackingData;
    const statusDescription = status?.description || 'N/A';
    const statusTimestamp = status?.timestamp ? new Date(status.timestamp).toLocaleString() : 'N/A';
    const statusLocation = status?.location?.address?.addressLocality || 'N/A';

    return (
        <>
            <Header />
            <div className='container mx-auto my-8 px-16'>
                <div className="bg-white p-6 border shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Order ID: {orderId}</h1>
                    <div className="flex justify-center w-full px-10">
                        <OrderProgress 
                            status={order.status} 
                            orderDates={{
                                orderDate: order.order_date,
                                shipDate: order.ship_date,
                                completeDate: order.complete_date,
                            }} />
                    </div> 
                    {/* 订单状态部分 */}
                    <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-bold text-yellow-600">Status: {statusDescription}</h2>
                    <p className="text-gray-700">Current Location: {statusLocation}</p>
                    <p className="text-gray-500 text-sm">Last Update: {statusTimestamp}</p>
                    </div>

                    {/* 订单信息部分 */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Order Information</h3>
                    <p className="text-gray-700">Shipper: {origin?.address?.addressLocality || 'N/A'}</p>
                    <p className="text-gray-700">Destination: {destination?.address?.addressLocality || 'N/A'}</p>
                    <p className="text-gray-700">Service: {trackingData.service || 'N/A'}</p>
                    </div>

                    {/* Proof of Delivery (if available) */}
                    {details?.proofOfDelivery && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
                    )}

                    {/* 追踪事件部分 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
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
                            Status: {event.status?.description || 'N/A'}
                            </p>
                        </li>
                        ))}
                    </ul>
                    </div>
                    {location && <OrderMap location={statusLocation} />}
                </div>
            </div>
        </>
    );
}
