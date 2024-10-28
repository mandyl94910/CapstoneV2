import React, { useState } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import ContactUsModal from "./ContactUsModal";
import { useMessageContext } from "../../context/MessageContext"; // Importing context

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refreshMessageCount } = useMessageContext(); // Function to refresh message count

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function called after sending a new message
  const handleNewMessage = async () => {
    await refreshMessageCount(); // Refresh message count
  };

  return (
    <div>
      <hr className="border-gray-300" />
      <div className="flex flex-wrap justify-between h-auto pt-8 px-16">
        <div className="mb-6">
          <Image src="/logo.png" alt="Logo" width={120} height={60} />
          <p className="text-gray-500 pt-4 text-sm max-w-96">
            Top Tradings delivers cutting-edge electronics to enhance everyday
            convenience, empowering people to live smarter and more connected
            lives.
          </p>
          <div className="flex space-x-4 pt-2 text-lg text-gray-500">
            <FaFacebook /> <FaTwitter /> <FaInstagram /> <FaYoutube />
          </div>
        </div>

        <div className="flex space-x-10">
          <div className="text-sm">
            <h2 className="text-base font-bold mb-3">Contact Us</h2>
            <p className="mb-1">Email: toptradings@gmail.com</p>
            <p className="mb-1">Phone: +1 587-123-4567</p>
            <p className="mb-1">768 street NW City Prov</p>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white text-base mt-2 px-5 py-1 rounded-lg hover:bg-blue-500"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-6" />
      <p className="text-center text-gray-500 py-4">Top tradings - 2024</p>

      {/* Contact Us Modal */}
      <ContactUsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onNewMessage={handleNewMessage}
      />
    </div>
  );
}
