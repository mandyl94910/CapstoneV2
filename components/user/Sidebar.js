

export default function Sidebar() {

    return(
        <div>
            <nav className="w-48 border bg-white p-4 rounded-md shadow-md">
                <ul>
                    <li className="py-2 border-b cursor-pointer hover:text-blue-600">My account</li>
                    <li className="py-2 border-b cursor-pointer hover:text-blue-600">Orders</li>
                    <li className="py-2 border-b cursor-pointer hover:text-blue-600">Favorite</li>
                    <li className="py-2 border-b cursor-pointer hover:text-blue-600">Settings</li>
                </ul>
            </nav>
        </div>
    );
}