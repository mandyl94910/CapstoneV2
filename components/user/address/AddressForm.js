import { useState } from "react";
import InputField from "./InputField";


const AddressForm = ({ formData, setFormData, handleSubmit, onCancel }) => {

    const [phoneError, setPhoneError] = useState("");
    const [postalError, setPostalError] = useState("");
    const [errors, setErrors] = useState({});
    
    /**
     * Helped by chatGPT
     * Prompt: How to get the data updated for the form
     * 
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

    // validate phone number
    const validatePhone = (phone) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
    }

    // validate postal
    const validatePostal = (postal) => {
        const postalPattern = /^[a-zA-Z]\d[a-zA-Z] ?\d[a-zA-Z]\d$/;
        return postalPattern.test(postal);
    }

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = "Enter a first name";
        if (!formData.last_name) newErrors.last_name = "Enter a last name";
        if (!formData.street) newErrors.street = "Enter an address";
        if (!formData.city) newErrors.city = "Enter a city";
        if (!formData.province) newErrors.province = "Choose province";
        if (!formData.postal) newErrors.postal = "Enter a ZIP / postal code";
        if (!formData.phone) newErrors.phone = "Enter a phone number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmitWrapper = (e) => {
        e.preventDefault();

        // if all fields are filled, check specific format for phone and postal
        if (validateFormData()) {
            if (!validatePhone(formData.phone)) {
                //setPhoneError("Phone number must be 10 digits.");
                setErrors((preErrors) => ({
                    ...preErrors,
                    phone: "Phone number must be 10 digits."
                }));
                return;
            }
    
            if (!validatePostal(formData.postal)) {
                //setPostalError("Postal code format is incorrect.(e.g., A1A 1A1)");
                setErrors((preErrors) => ({
                    ...preErrors,
                    postal: "Postal code format is incorrect.(e.g., A1A 1A1)"
                }));
                return;
            }
        }

        handleSubmit(e);
    }

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
        <form className="space-y-4" onSubmit={handleSubmitWrapper}>
            {/* First name and Last name */}
            <div className="grid grid-cols-2 gap-x-4">
                <InputField
                    label="First name"
                    value={formData.first_name}
                    onChange={(e) =>
                        setFormData({...formData, first_name: e.target.value})
                    }
                    placeholder="First Name"
                    error={errors.first_name}
                />
                <InputField
                    label="Last Name"
                    value={formData.last_name}
                    onChange={(e) =>
                        setFormData({...formData, last_name: e.target.value})
                    }
                    placeholder="Last Name"
                    error={errors.last_name}
                />
            </div>

            {/* Phone input */}
            <InputField
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                error={errors.phone}
            />

            {/* Address input */}
            <InputField
                label="Address"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="Street"
                error={errors.street}
            />
            
            {/* City and Province */}
            <div className="grid grid-cols-2 gap-x-4">
                <InputField
                    label="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    error={errors.city}
                />
                <div>
                    <label className="block text-md font-medium mb-1">
                        <span className="text-red-600">*</span>Province:</label>
                    <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            {/* Postal and Country */}
            <div className="grid grid-cols-2 gap-x-4">
                <InputField
                    label="Postal Code"
                    value={formData.postal}
                    onChange={(e) =>
                    setFormData({ ...formData, postal: e.target.value })
                    }
                    placeholder="Postal Code"
                    error={errors.postal}
                />
                <div>
                <label className="block text-md font-medium mb-1">
                    <span className="text-red-600">*</span>Country:</label>
                 <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="Canada">Canada</option>
                </select>
            </div>
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
