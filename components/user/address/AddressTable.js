import { FaEdit, FaTrash } from "react-icons/fa";

const AddressTable = ({ addresses, onEditClick, onDeleteClick }) => {

    return (
        <>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="h-12 w-full bg-blue-100 text-left">
                        <th className="px-6">Name</th>
                        <th className="px-6">Phone</th>
                        <th className="px-6">Street</th>
                        <th className="px-6">City</th>
                        <th className="px-6">Province</th>
                        <th className="px-6">Postal Code</th>
                        <th className="px-6">Edit</th>
                        <th className="px-6">Default</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address, index) => (
                        <tr key={address.id} 
                            className={`h-14 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                        >
                            {/* <td className="px-6">{address.first_name} {address.last_name}</td> */}
                            <td className="px-6">hardcode name</td>
                            {/* <td className="px-6">{address.phone}</td> */}
                            <td className="px-6">hardcode phone</td>
                            <td className="px-6">{address.street}</td>
                            <td className="px-6">{address.city}</td>
                            <td className="px-6">{address.province}</td>
                            <td className="px-6">{address.postal}</td>
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
                            <td className="px-6">
                                {address.is_default ? (
                                <span className="bg-blue-300 rounded-md px-2 py-1 text-blue-800 font-bold">Default</span>
                                ) : (
                                <p>N/A</p>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AddressTable;
