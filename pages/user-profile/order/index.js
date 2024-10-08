import { useState } from "react";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import OrderList from "../../../components/user/order/OrderList";
import Tabs from "../../../components/user/order/Tabs";
import Sidebar from "../../../components/user/Sidebar";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";


export default function OrderPage() {
    const [activeTab, setActiveTab] = useState("allOrders");

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
                        <OrderList activeTab={activeTab}/>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </>
    );
}