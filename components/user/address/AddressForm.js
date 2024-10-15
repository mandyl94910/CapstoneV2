

const AddressForm = ({ formData, setFormData, handleSubmit, onCancel }) => {

    /**
     * Helped by chatGPT
     * Prompt: How to get the data updated for the form
     * @param {*} e 
     */
    // update value or checked state
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            // if type is checkbox update the checked state
            // if not update the value for the field
            [name]: type === "checkbox" ? checked : value
        });
    };

    // const provinces = [
    //     "Alberta", "British Columbia", "Manitoba", "New Brunswick", 
    //     "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", 
    //     "Nunavut", "Ontario", "Prince Edward Island", "Quebec", 
    //     "Saskatchewan", "Yukon"
    // ];
    const provinces = [
        "AB",  // Alberta
        "BC",  // British Columbia
        "MB",  // Manitoba
        "NB",  // New Brunswick
        "NL",  // Newfoundland and Labrador
        "NT",  // Northwest Territories
        "NS",  // Nova Scotia
        "NU",  // Nunavut
        "ON",  // Ontario
        "PE",  // Prince Edward Island
        "QC",  // Quebec
        "SK",  // Saskatchewan
        "YT"   // Yukon
      ];

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>First Name:</label>
                <input 
                    type="text" 
                    name="first_name" 
                    value={formData.first_name} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="First Name"
                    required
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Last Name:</label>
                <input 
                    type="text" 
                    name="last_name" 
                    value={formData.last_name} 
                    onChange={handleChange} 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Last Name"
                    required
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
                    required
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
                    required
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
                    required
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Province:</label>
                <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                        <option key={province} value={province}>
                            {province}
                        </option>
                    ))}
                </select>
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
                    required
                />
            </div>
            <div className="flex items-center">
                <label className="w-1/3 text-right pr-4">
                    <span className="text-red-600">*</span>Country:</label>
                 <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="Canada">Canada</option>
                </select>
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
                    type="submit" 
                    className="bg-blue-500 text-white px-7 py-2 rounded-lg hover:bg-blue-600"
                    
                >
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
