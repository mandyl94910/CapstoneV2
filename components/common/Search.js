import { FaSearch } from "react-icons/fa";


export default function Search(){
    return(
        <div className="relative">
            <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded pl-10" 
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Adjust icon position */}
        </div>
    );
}