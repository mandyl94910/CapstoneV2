import { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import AddressForm from "../../../components/user/address/AddressForm"; 
import AddressTable from "../../../components/user/address/AddressTable"; 
import Modal from "../../../components/user/address/Modal"; 
import { useRouter } from "next/router";
import Footer from "../../../components/common/Footer";
import Sidebar from "../../../components/user/Sidebar";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

/**
 * helped with chatGPT
 * prompt: How can I create a popup for edit/add new address, 
 * and it can be closed by click cancel or close button on the right top
 * 
 */
export default function Address() {
    const [addresses, setAddresses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null); // for checking it is a new address or just need to be edit
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        street: "",
        city: "",
        province: "",
        postal: "",
        country: "Canada",
        is_default: false
    });

    const router = useRouter();
    const { id } = router.query;
    const customerId = parseInt(id, 10);


    useEffect(() => {
        if (customerId) {
            const fetchAddresses = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/addresses/${customerId}`);
                    setAddresses(response.data);
                } catch (error) {
                    console.error('Error fetching addresses by customerId:', error); 
                }
            };
            fetchAddresses();
        }
    }, [customerId, addresses]);

    // when click edit icon
    const handleEditClick = (address) => {
        setSelectedAddressId(address.id);
        setFormData({
            // first_name: address.first_name,
            // last_name: address.last_name,
            // phone: address.phone,
            street: address.street,
            city: address.city,
            province: address.province,
            postal: address.postal,
            // because there is no customer name and phone on address table currently, 
            // so temporary using those data from customer table
            // customer_name: address.Customer.customer_name,
            // phone: address.Customer.phone,
            country: address.country,
            is_default: address.is_default
        });
        setShowEditModal(true);
    };

    // when click add button
    const handleAddClick = () => {
        setSelectedAddressId(null); 
        setFormData({
            first_name: "",
            last_name: "",
            phone: "",
            street: "",
            city: "",
            province: "",
            postal: "",
            country: "Canada",
            is_default: false
        });
        setShowEditModal(true); 
    };

    // when click delete icon
    const handleDeleteClick = (id) => {
        setSelectedAddressId(id);
        setShowDeleteModal(true);
    };


    const handleSubmit = async (e) => {
        //stop Page Refresh or Jump
        e.preventDefault();

        console.log(customerId);

        // incase submit the form without customerId
        if (isNaN(customerId)) {
            console.error('Invalid customer ID');
            return; // 防止提交没有 customer_id 的表单
        }
        const addressData = {
            ...formData,
            customer_id: customerId,
        };
        console.log('addressData test',addressData);
        try {
            if (selectedAddressId) {
                // edit api hasn't done yet
                const response = await axios.put(`http://localhost:3001/api/addresses/${selectedAddressId}`, formData);
            
                setAddresses((prevAddresses) =>
                    prevAddresses.map((address) =>
                        // if id is the same as selectedId, update the address, if not keep the same
                        address.id === selectedAddressId ? response.data : address
                    )
                );
            } else {
                const response = await axios.post(`http://localhost:3001/api/address/add`, addressData, {
                    headers: {
                        'Content-Type': 'application/json', 
                        }
                });
                console.log('addresses from api', response.data);
                setAddresses((prevAddresses) => [...prevAddresses, response.data]);
            }
            setShowEditModal(false); 
        } catch (error) {
            console.error('Error submitting address:', error);
        }
        
    };

    const confirmDelete = async () => {
        if (!selectedAddressId) {
            console.error('Address ID is missing.');
            return;
          }

        try {
            // delete api hasn't done yet
            //await axios.delete(`http://localhost:3001/api/address/delete/${selectedAddressId}`);
            
            // update addresses array after deleting
            setAddresses((prevAddresses) => 
                prevAddresses.filter(address => address.id !== selectedAddressId)
            );
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
        
    };

    return (
        <>
            <Header />
            <header className="flex items-center h-20 mx-16 mt-6">
                <Link href="/user-profile">
                    <div className="flex justify-center items-center text-blue-600 text-3xl font-bold">
                        <FaAngleLeft/>
                        <p>Profile</p>
                    </div>
                </Link>
            </header>
            <div className="px-16 pb-16 w-full m-auto h-aotu">
                <div className="flex justify-between items-center text-center">
                    <h1 className="text-2xl font-bold mb-6">My Address</h1>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 mb-4"
                        onClick={handleAddClick}
                    >
                        <FaPlus className="mr-2" /> Add new address
                    </button>
                </div>

                <AddressTable addresses={addresses} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />

                {/* Edit/add Modal*/}
                <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                    <h2 className="text-lg font-semibold mb-4">{selectedAddressId ? "Edit Address" : "Add new Address"}</h2>
                    <AddressForm 
                        formData={formData}
                        setFormData={setFormData}
                        // handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        onCancel={() => setShowEditModal(false)}
                    />
                </Modal>

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-[280px]">
                            <button 
                                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                <FaTimes />
                            </button>
                            <h2 className="text-gray-700 mt-3 mb-8 text-sm">Confirm deletion of the address?</h2>
                            <div className="flex justify-between">
                                <button 
                                    className="bg-gray-200 px-7 py-2 rounded-lg"
                                    onClick={() => setShowDeleteModal(false)}  // close the modal
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-7 py-2 rounded-lg hover:bg-red-600"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}
