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

export default function Address() {
    const [addresses, setAddresses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [formData, setFormData] = useState({
        street: "",
        city: "",
        province: "",
        postal: "",
        customer_name: "",
        phone: "",
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
    }, [customerId]);

    // when click edit icon
    const handleEditClick = (address) => {
        setSelectedAddressId(address.id);
        setFormData({
            street: address.street,
            city: address.city,
            province: address.province,
            postal: address.postal,
            customer_name: address.Customer.customer_name,
            phone: address.Customer.phone,
            is_default: address.is_default
        });
        setShowEditModal(true);
    };

    // when click add button
    const handleAddClick = () => {
        setSelectedAddressId(null); 
        setFormData({
            street: "",
            city: "",
            province: "",
            postal: "",
            customer_name: "",
            phone: "",
            is_default: false
        });
        setShowEditModal(true); 
    };

    // when click delete icon
    const handleDeleteClick = (id) => {
        setSelectedAddressId(id);
        setShowDeleteModal(true);
    };

    // update value or checked state that user changed
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            // if type is checkbox update the checked state
            // if not update the value for the field
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async () => {
        if (selectedAddressId) {
            // edit
            await axios.put(`http://localhost:3001/api/addresses/${selectedAddressId}`, formData);
        } else {
            // add
            await axios.post(`http://localhost:3001/api/addresses`, formData);
        }
        setShowEditModal(false); 
    };

    const confirmDelete = async () => {
        await axios.delete(`http://localhost:3001/api/addresses/${selectedAddressId}`);
        setShowDeleteModal(false);
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

                {/* Edit Modal*/}
                <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                    <h2 className="text-lg font-semibold mb-4">{selectedAddressId ? "Edit Address" : "Add new Address"}</h2>
                    <AddressForm 
                        formData={formData}
                        handleChange={handleChange}
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
