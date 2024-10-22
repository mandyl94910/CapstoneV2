import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/user/Sidebar";
import RecommendedProducts from "../../components/common/RecommendedProducts";
import Link from "next/link";
import DefaultAddress from "../../components/user/DefaultAddress";


/**
 * Helped with chatGPT
 * Create a page to display the user's basic information and order statistics
 */
export default function UserProfile() {

    const { user } = useAuth();

    const [stats, setStats] = useState({
    pendingPayment: 0,
    pendingShipment: 0,
    pendingReview: 0,
    returns: 0,
    });

    
    if (!user){
        return(
            <div>
                <p>Please login to view this page.</p>
            </div>
        );
    }
    
    return(
        <>
            <Header/>
            <div className="mx-16 justify-center">
                <header className="flex items-center h-20 mt-6">
                    <Link href="/user-profile">
                        <div className="flex justify-center items-center text-blue-600 text-3xl font-bold">
                            <p>Profile</p>
                        </div>
                    </Link>
                </header>

                <div className="container flex">
                    <Sidebar/>
                    {/* Main Content */}
                    <main className="min-w-[800px] border bg-white py-4 px-6 rounded-md shadow-md ml-4">
                    {/* User Info */}
                        <div className="flex justify-between items-center mb-6">
                            {/* avatar and basic info */}
                            <div className="flex items-center mr-16">
                                <img
                                    src="/images/user/user.webp" // hardcode for testing
                                    // src={`/images/${user.image}`} 
                                    alt="User Avatar"
                                    className="w-16 h-16 rounded-full mr-4"
                                />
                                <div>
                                    <h2 className="text-lg font-bold">{user.customer_name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-around w-full">
                            {Object.keys(stats).map((key, index) => (
                                <div key={index} className="text-center">
                                <h4 className="font-bold">{stats[key]}</h4>
                                <p>{key}</p>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <DefaultAddress customer_id={user.customer_id}/>

                        {/* Order tracking */}
                        <h3 className="font-bold mb-4">Track order</h3>
                        <p className="text-gray-500">No available</p>

                        <RecommendedProducts />
                    </main>
                </div>
            </div>
        </>
    );
}