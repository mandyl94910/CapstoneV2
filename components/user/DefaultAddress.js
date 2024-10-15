import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import Modal from './address/Modal';
import AddressForm from './address/AddressForm';
 

const DefaultAddress = ({ customer_id }) => {
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAddress, setHasAddress] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        street: "",
        city: "",
        province: "",
        postal: "",
        country: "Canada",
        is_default: true
    });

    useEffect(() => {

        const fetchDefaultAddress = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/addresses/${parseInt(customer_id, 10)}`);
                const addresses = response.data;

                const defaultAddress = addresses.find(addr => addr.is_default);

                if (defaultAddress) {
                    setDefaultAddress(defaultAddress);
                    setHasAddress(true);
                } else {
                    setHasAddress(false);
                }
                
            } catch (error) {
                console.error('Error fetching default address:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDefaultAddress();

    }, [customer_id, defaultAddress]);

    const handleSubmit = async (e) => {
        //stop Page Refresh or Jump
        e.preventDefault();

        const addressData = {
            ...formData, 
            customer_id: parseInt(customer_id, 10),
        };

        try {
            const response = await axios.post('http://localhost:3001/api/address/add', addressData, {
                headers: {
                    'Content-Type': 'application/json', 
                  }
            } );
            console.log('Address added:', response.data);
            setDefaultAddress(response.data);
            setHasAddress(true);
            setShowAddModal(false);

        } catch (error) {
            console.error('Error adding address:', error);
        }
    }

    if (loading) return <p>Loading...</p>;


    return (
        <div>
          {hasAddress && defaultAddress ? (
            // if there is a default address
            <Link href={`/user-profile/address/${customer_id}`}>
                <div className="bg-blue-100 p-4 rounded-md mb-6">
                    <div className="flex justify-between">
                        <h3 className="font-bold">Default Shipping Address:</h3>
                        <FaAngleRight />
                    </div>
                    <hr className="border-gray-500 m-1"/>
                    <hr className="text-gray-700"/>
                    <p className="text-gray-900 font-bold">{defaultAddress.first_name} {defaultAddress.last_name}</p>
                    <p className="text-gray-700">{defaultAddress.phone}</p>
                    <p className="text-gray-700">
                    {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.province}, {defaultAddress.postal}, {defaultAddress.country}
                    </p>
                </div>
            </Link>
          ) : (
            // If there is no address being added ever
            <div>
                <div className="bg-gray-200 p-4 rounded-md mb-6 text-center"
                    onClick={() => setShowAddModal(true)}>
                    <p className="text-gray-600">Add a shipping address</p>
                    <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-md">
                    Add Address
                    </button>
                </div>

                <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
                    <h2 className="text-lg font-semibold mb-4">Add Address</h2>
                    <AddressForm 
                        formData={formData}
                        setFormData={setFormData} 
                        handleSubmit={handleSubmit}
                        onCancel={() => setShowAddModal(false)}
                    />
                </Modal>
            </div>
          )}
        </div>
      );
    
};

export default DefaultAddress;