import { FaTimes } from "react-icons/fa";


const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex justify-center p-6 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[450px] max-h-[90vh] overflow-y-auto">
                <button 
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
