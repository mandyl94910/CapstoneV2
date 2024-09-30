//C:\proj309\CapstoneV2\pages\admin\addProduct.js
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    price: "",
    quantity: "",
    category: "", // Start with an empty category
    visibility: false,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]); // Store categories from the database
  const [validationMessage, setValidationMessage] = useState(""); // For displaying validation errors

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/subcategories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("product_description", formData.product_description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category_id", formData.category); // Assume category ID is stored in category
    data.append("visibility", formData.visibility);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:3001/api/products/add", {
        method: "POST",
        body: data,
      });

      if (response.ok) {

        router.push('/admin/product')
      } 
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle cancel button (navigates back to product management page)
  const handleCancel = () => {
    router.push("/admin/product");
  };

  // Validate form fields
  const validateForm = () => {
    if (!formData.product_name) {
      setValidationMessage("Product name cannot be empty.");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setValidationMessage("Price must be greater than 0.");
      return false;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      setValidationMessage("Quantity must be greater than 0.");
      return false;
    }
    if (!formData.category) {
      setValidationMessage("Please select a category.");
      return false;
    }
    if (!formData.image) {
      setValidationMessage("Please upload a product image.");
      return false;
    }
    setValidationMessage(""); // Clear the message if everything is valid
    return true;
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

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Product Description</label>
          <input
            type="text"
            name="product_description"
            value={formData.product_description}
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
            {/* Default Prompt Options */}
            <option value="">Select one category</option>  

            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}> 
                  {category.name}
                </option>
              ))
            ) : (
              <option>Loading categories...</option>
            )}
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

        {/* Validation Message */}
        {validationMessage && (
          <div className="text-red-500 mb-4">{validationMessage}</div>
        )}

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
