

const AddressForm = ({ formData, handleChange, handleSubmit, onCancel }) => {
    return (
        <form className="space-y-4">
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Consignee:</label>
                <input 
                    type="text" 
                    name="customer_name" 
                    value={formData.customer_name} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Consignee"
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Phone:</label>
                <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Street:</label>
                <input 
                    type="text" 
                    name="street" 
                    value={formData.street} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Street"
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>City:</label>
                <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City"
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Province:</label>
                <input 
                    type="text" 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Province"
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Postal:</label>
                <input 
                    type="text" 
                    name="postal" 
                    value={formData.postal} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Postal"
                />
            </div>
            
            <div className="mb-3">
                <label className="inline-flex items-center">
                    <input 
                        type="checkbox" 
                        name="is_default" 
                        checked={formData.is_default} 
                        onChange={handleChange} 
                        className="form-checkbox"
                    />
                    <span className="ml-2">set this as default address</span>
                </label>
            </div>
            <div className="flex justify-end space-x-4">
                <button 
                    type="button" 
                    className="bg-gray-200 px-7 py-2 rounded-lg"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button 
                    type="button" 
                    className="bg-blue-500 text-white px-7 py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
