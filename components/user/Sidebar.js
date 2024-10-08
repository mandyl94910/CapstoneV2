import Link from "next/link";
import { useRouter } from "next/router";
import { FaBell, FaFileLines, FaGear, FaHeart, FaUser } from "react-icons/fa6";


export default function Sidebar() {
    const router = useRouter();

    return(
        <div>
            <nav className="w-48 border bg-white p-4 rounded-md shadow-md">
                <ul>
                    <Link href="/user-profile">
                        <li className={`flex items-center space-x-3 py-2 border-b cursor-pointer ${router.pathname === '/user-profile' ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                            <FaUser/> 
                            <p>My account</p>
                        </li>
                    </Link>
                    <Link href="/user-profile/order">
                        <li className={`flex items-center space-x-3 py-2 border-b cursor-pointer ${router.pathname === '/user-profile/order' ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                            <FaFileLines/>
                            <p>Orders</p>
                        </li>
                    </Link>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaHeart/>
                        <p>Favorite</p>
                    </li>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaBell/> 
                        <p>Notification</p>
                    </li>
                    <Link href="/user-profile/settings">
                        <li className={`flex items-center space-x-3 py-2 border-b cursor-pointer ${router.pathname === '/user-profile/settings' ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                            <FaGear/> 
                            <p>Settings</p>
                        </li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}