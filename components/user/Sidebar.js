import Link from "next/link";
import { useRouter } from "next/router";
import { FaBell, FaFileLines, FaGear, FaHeart, FaUser } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import { hr } from "@faker-js/faker";

/**
 * Helped by chatGPT
 * Sidebar Component
 * 
 * This component renders a sidebar for user navigation. It includes links
 * to various sections of the user's profile, such as account information, 
 * orders, and settings.
 *
 * Features:
 * - Displays user-specific links conditionally based on authentication state.
 * - Highlights the active link based on the current route.
 * - Uses icons for visual representation of each navigation item.
 */
export default function Sidebar() {
    const router = useRouter();
    const {user} = useAuth();

    // Function to render a navigation item
    // This function generates a clickable link with an icon and label
    const NavItem = ({ href, icon, label}) => (
        <Link href={href}>
            <li className={`flex items-center space-x-3 py-2 border-b cursor-pointer 
                ${router.pathname === href ? 'text-blue-600' : 'hover:text-blue-600'}`}
            >
                {icon}
                <p>{label}</p>
            </li>
        </Link>
    );

    return(
        <div>
            <nav className="w-48 border bg-white p-4 rounded-md shadow-md">
                <ul>
                    {/* My Account link */}
                    <NavItem href="/user-profile" icon={<FaUser/>} label="My account"/>
           
                    {user && (
                        <NavItem 
                            href={`/user-profile/order/${user.customer_id}`} 
                            icon={<FaFileLines />} 
                            label="Orders" 
                        />
                    )}
                    
                    {/* Favorite link */}
                    <NavItem href="/user-profile/" icon={<FaHeart />} label="Favorite" />
                    
                    {/* Notifications link */}
                    <li className="flex items-center space-x-3 py-2 border-b cursor-pointer hover:text-blue-600">
                        <FaBell /> {/* Notification icon */}
                        <p>Notification</p> {/* Notification label */}
                    </li>
                    
                    {/* Settings link */}
                    <NavItem href="/user-profile/settings" icon={<FaGear />} label="Settings" />
                </ul>
            </nav>
        </div>
    );
}