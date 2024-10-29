import { useEffect, useState } from "react";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import OrderList from "../../../components/user/order/OrderList";
import Tabs from "../../../components/user/order/Tabs";
import Sidebar from "../../../components/user/Sidebar";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/router";
import axios from "axios";

/**
 * Helped with chatGPT
 * Create a order page which can retrieve orders from databse based on the customerId
 * Pass orders retrieved to OrderList to display after beling filtering
 */
export default function OrderPage() {
    const router = useRouter();
    const { customerId } = router.query;

    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("allOrders");

    useEffect(() => {
        const fetchOrders = async () => {
            // if there is no customerId, do not send request
            if (!customerId) return;
            try {
                const response = await axios.get(`http://localhost:3001/api/orders/customer/${customerId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders by customerId:', error); 
            }
        }
        fetchOrders();
    }, [customerId]);


    return(
        <>
            <Header/>
            <header className="flex items-center h-20 mx-16 mt-6">
                <Link href="/user-profile">
                    <div className="flex justify-center items-center text-blue-600 text-3xl font-bold">
                        <FaAngleLeft/>
                        <p>Profile</p>
                    </div>
                </Link>
            </header>
            <div className="mx-16 justify-center">
                <div className="container flex">
                    <Sidebar/>
                    <div>
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                        <OrderList activeTab={activeTab} orders={orders} customerId={customerId}/>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </>
    );
}