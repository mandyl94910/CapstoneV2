import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const AddressForm = ({ formData, setFormData, handleSubmit, onCancel }) => {
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const router = useRouter(); // useRouter 훅 사용

  useEffect(() => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      handleSubmit(e);
    }
  };

  const handleCancel = () => {
    router.push("/cart"); // 카트 페이지로 이동
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleFormSubmit}>
        {/* 주소 선택 드롭다운 */}
        <label className="block text-lg font-medium mb-2">
          Choose an existing address
        </label>
        <select
          className={`w-full border ${
            errors.addressId ? "border-red-500" : "border-gray-300"
          } rounded-lg px-4 py-3 mb-6`}
          onChange={(e) =>
            setFormData({
              ...formData,
              addressId: e.target.value,
            })
          }
          value={formData.addressId || ""}
        >
          <option value="">Select an address</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.street}, {address.city}, {address.province}
            </option>
          ))}
        </select>

        {/* First name and Last name */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-md font-medium mb-1">First name</label>
            <input
              type="text"
              className={`w-full border ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-3`}
              value={formData.first_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              placeholder="First name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium mb-1">Last name</label>
            <input
              type="text"
              className={`w-full border ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-3`}
              value={formData.last_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              placeholder="Last name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-md font-medium mb-1">Address</label>
          <input
            type="text"
            className={`w-full border ${
              errors.street ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-3`}
            value={formData.street || ""}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            placeholder="Street"
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        {/* City, Province, Postal Code */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-md font-medium mb-1">City</label>
            <input
              type="text"
              className={`w-full border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-3`}
              value={formData.city || ""}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium mb-1">Province</label>
            <input
              type="text"
              className={`w-full border ${
                errors.province ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-3`}
              value={formData.province || ""}
              onChange={(e) =>
                setFormData({ ...formData, province: e.target.value })
              }
              placeholder="Province"
            />
            {errors.province && (
              <p className="text-red-500 text-sm mt-1">{errors.province}</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              className={`w-full border ${
                errors.postal ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-3`}
              value={formData.postal || ""}
              onChange={(e) =>
                setFormData({ ...formData, postal: e.target.value })
              }
              placeholder="Postal Code"
            />
            {errors.postal && (
              <p className="text-red-500 text-sm mt-1">{errors.postal}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-md font-medium mb-1">Phone</label>
          <input
            type="text"
            className={`w-full border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-3`}
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

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
