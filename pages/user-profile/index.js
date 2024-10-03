import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/user/Sidebar";
import RecommendedProducts from "../../components/common/RecommendedProducts";
import { FaEdit } from "react-icons/fa";



export default function UserProfile() {

    const { user, onLogout } = useAuth();

    const [stats, setStats] = useState({
    pendingPayment: 0,
    pendingShipment: 0,
    pendingReview: 0,
    returns: 0,
    });


    if (!user){
        return(
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    
    return(
        <>
            <Header/>
            <div className="mx-16 my-6 justify-center">
                <header className="flex justify-between h-20 px-6 items-center bg-white border rounded-md  shadow-md">
                    <p className="text-blue-600 text-3xl font-bold">Profile</p>
                </header>

                <div className="container flex mt-6">
                    <Sidebar/>
                    {/* Main Content */}
                    <main className="w-auto border bg-white py-4 px-6 rounded-md shadow-md ml-4">
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
                        <div className="bg-blue-100 p-4 rounded-md mb-6">
                            <div className="flex justify-between">
                                <h3 className="font-bold">Main Shipping Address:</h3>
                                <FaEdit />
                            </div>
                            
                            <p>Name: {user.firstName} {user.lastName}</p>
                            <p>Phone: {user.phone}</p>
                            <p className="text-gray-700">{user.address} 786 14 Street NW, Calgary, AB {user.postcal}E39 5H2</p>
                        </div>

                        {/* My Logistics */}
                        <h3 className="font-bold mb-4">Track order</h3>
                        <p className="text-gray-500">No available</p>

                        <RecommendedProducts />
                    </main>
                </div>
            </div>
        </>
    );
}