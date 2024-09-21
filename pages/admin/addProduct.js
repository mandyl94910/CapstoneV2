import React, { useState } from "react";
import { useRouter } from "next/router";

const categoryOptions = [
  "Mobile Phones & Accessories / Smartphones",
  "TV & Home Entertainment / Televisions",
  "Computers & Accessories / Laptops",
  "Gaming & Accessories / Consoles",
  "Cameras & Photography Gear / Digital Cameras",
  "Home Appliances / Kitchen Appliances",
  "Wearable Technology / Smartwatches",
];

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    quantity: "",
    category: categoryOptions[0], // Set the first category as default
    visibility: false,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:", formData);
    router.push("/admin/productManagement");
  };

  // Handle cancel button (navigates back to product management page)
  const handleCancel = () => {
    router.push("/admin/product");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-1/3"
      >
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="mt-4 w-32 h-32 object-cover"
            />
          )}
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Visibility */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={true}>Visible</option>
            <option value={false}>Hidden</option>
          </select>
        </div>

        {/* Submit Button
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 hover:text-green-200 text-white py-3 px-20 mt-4 rounded"
          >
            Add Product
          </button>
        </div> */}

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={handleCancel} // Cancels the form and navigates back
            className="bg-red-500 text-white py-2 px-6 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
