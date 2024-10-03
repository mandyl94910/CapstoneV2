import { FaBell, FaFileLines, FaGear, FaHeart, FaUser } from "react-icons/fa6";


export default function Sidebar() {

    return(
        <div>
            <nav className="w-48 border bg-white p-4 rounded-md shadow-md">
                <ul>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaUser/> 
                        <p>My account</p>
                    </li>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaFileLines/>
                        <p>Orders</p>
                    </li>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaHeart/>
                        <p>Favorite</p>
                    </li>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaBell/> 
                        <p>Notification</p>
                    </li>
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaGear/> 
                        <p>Settings</p>
                    </li>
                </ul>
            </nav>
        </div>
    );
}