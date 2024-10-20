import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import InputField from "./addressForm/InputField";
import SelectField from "./addressForm/SelectField";
import AddressDropdown from "./addressForm/AddressDropdown";
import taxRates from "./addressForm/TaxRates";

const AddressForm = ({ formData, setFormData, handleSubmit }) => {
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Fetch addresses for the logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      const fetchAddresses = async () => {
        try {
          const response = await axios.get(`/api/addresses/${user.id}`);
          setAddresses(response.data);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    } else {
      console.error("User is not logged in.");
    }
  }, []);

  // Handle form validation
  const handleValidation = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "Enter a first name";
    if (!formData.last_name) newErrors.last_name = "Enter a last name";
    if (!formData.street) newErrors.street = "Enter an address";
    if (!formData.city) newErrors.city = "Enter a city";
    if (!formData.province) newErrors.province = "Enter a province";
    if (!formData.postal) newErrors.postal = "Enter a ZIP / postal code";
    if (!formData.phone) newErrors.phone = "Enter a phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      handleSubmit(e);
    }
  };

  // Handle cancel button click (navigate to cart page)
  const handleCancel = () => {
    router.push("/cart");
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleFormSubmit}>
        {/* Address dropdown */}
        <AddressDropdown
          addresses={addresses}
          value={formData.addressId}
          onChange={(e) =>
            setFormData({
              ...formData,
              addressId: e.target.value,
            })
          }
          error={errors.addressId}
        />

        {/* First name and Last name */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InputField
            label="First name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            placeholder="First name"
            error={errors.first_name}
          />
          <InputField
            label="Last name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            placeholder="Last name"
            error={errors.last_name}
          />
        </div>

        {/* Address input */}
        <InputField
          label="Address"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          placeholder="Street"
          error={errors.street}
        />

        {/* City, Province, Postal Code */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <InputField
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            error={errors.city}
          />
          <SelectField
            label="Province"
            value={formData.province}
            onChange={(e) =>
              setFormData({ ...formData, province: e.target.value })
            }
            options={Object.keys(taxRates).map((province) => ({
              value: province,
              label: province,
            }))}
            error={errors.province}
          />
          <InputField
            label="Postal Code"
            value={formData.postal}
            onChange={(e) =>
              setFormData({ ...formData, postal: e.target.value })
            }
            placeholder="Postal Code"
            error={errors.postal}
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

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            className="text-gray-500 text-sm hover:underline flex items-center"
            onClick={handleCancel}
          >
            <FaAngleLeft className="mr-2" />
            Return to cart
          </button>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-3 rounded-md"
          >
            Continue to shipping
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
