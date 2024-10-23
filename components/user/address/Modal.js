import { FaTimes } from "react-icons/fa";

/**
 * Helped by chatGPT
 * Modal Component
 * 
 * This component represents a modal dialog that can display content 
 * over the current page. It is designed to be used for alerts, forms, 
 * or any other content that requires user interaction.
 *
 * Props:
 * - show: A boolean that determines whether the modal is visible.
 * - onClose: A function that is called when the modal should be closed.
 * - children: The content to be displayed inside the modal.
 *
 * Features:
 * - Renders a backdrop when visible, dimming the background content.
 * - Displays a close button (×) in the top right corner to close the modal.
 * - Allows scrolling if the content exceeds the maximum height of the modal.
 */
const Modal = ({ show, onClose, children }) => {
    // If show is false, return null to not render anything
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
