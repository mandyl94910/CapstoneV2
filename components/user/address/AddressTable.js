import { FaEdit, FaTrash } from "react-icons/fa";

const AddressTable = ({ addresses, onEditClick, onDeleteClick }) => {

    return (
        <>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="h-12 w-full bg-blue-100 text-center">
                        <th className="px-4">Name</th>
                        <th className="px-4">Phone</th>
                        <th className="px-4">Street</th>
                        <th className="px-4">City</th>
                        <th className="px-4">Province</th>
                        <th className="px-4">Postal Code</th>
                        <th className="px-4">Default</th>
                        <th className="px-4">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address, index) => (
                        <tr key={address.id || index} 
                            className={`h-14 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-center`}
                        >
                            <td className="px-4">{address.first_name} {address.last_name}</td>
                            <td className="px-4">{address.phone}</td>
                            <td className="px-4">{address.street}</td>
                            <td className="px-4">{address.city}</td>
                            <td className="px-4">{address.province}</td>
                            <td className="px-4">{address.postal}</td>
                            <td className="px-4">
                                {address.is_default ? (
                                <span className="border-blue-600 border-2 rounded-md px-2 py-1 text-blue-600">Default</span>
                                ) : (
                                <p>N/A</p>
                                )}
                            </td>
                            <td className="px-6">
                                {/* inline-flex make icons in td items-center with other data at the same row */}
                                <div className="inline-flex items-center space-x-2">
                                    <button 
                                        className="text-gray-500 hover:text-green-500"
                                        onClick={() => onEditClick(address)}><FaEdit/></button>
                                    <button 
                                        className="text-gray-500 hover:text-red-500"
                                        onClick={() => onDeleteClick(address.id)}><FaTrash/></button>
                                </div>
                                
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AddressTable;
