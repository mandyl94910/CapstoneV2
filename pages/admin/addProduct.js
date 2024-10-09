import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    price: "",
    quantity: "",
    category: "",
    visibility: false,
    images: [], // Array to store multiple images
  });

  const [imagePreviews, setImagePreviews] = useState([]); // Array for image previews
  const [categories, setCategories] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");

  // Handles changes to the inputs in the form. 
  //Its purpose is to dynamically update the formData state
  const handleChange = (e) => {
     // Deconstruct the name and value from the event target.
    const { name, value } = e.target;
    //Use the setFormData function to update the state of the formData.
    setFormData({
      //spread syntax
      ...formData,
      //[key] : value
      [name]: value,
    });
  };

  // Fetch categories from the API
  //Used to perform rendering-independent behavior in function components
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/subcategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
    //[] is an array of dependencies that control the timing of the useEffect hooks
  }, []);

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    //formData.images.length is the number of uploaded images, 
    //files.length is the number of newly selected files
    if (formData.images.length + files.length > 4) {
      alert("You can only upload a maximum of 4 images."); // Alert user
      return;
    }

    // Update formData with new images
    const updatedImages = [...formData.images, ...files].slice(0, 4); // Limit to 4 images
    setFormData({
      //keep others data
      ...formData,
      //only change images
      images: updatedImages,
    });

    // Generate previews for each image
    const previews = updatedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    //stop Page Refresh or Jump
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    //Converting data to JSON format improves standardization, 
    //compatibility, clarity of data structure and transmission efficiency.
    const jsonData = ({
      product_name: formData.product_name,
      product_description: formData.product_description,
      price: formData.price,
      quantity: formData.quantity,
      category_id: formData.category,
      visibility: formData.visibility,
    });

    try {
      //get is used to require data, and post is used to submit data
      const response = await axios.post("http://localhost:3001/api/products/add", jsonData, {
        //Allows the server to parse the data correctly
        headers: {
          //application/json: JSON format data for API data transfer.
          "Content-Type": "application/json",
        },
      });
      //Only the 2xx status code indicates that the request was successful and the server returned the expected result.
      if (response.status >= 200 && response.status < 300) {
        const product = response.data;
        const productId = product.product_id;

        console.log(productId)

        const imageData = new FormData();
        imageData.append('category_id', formData.category);
        formData.images.forEach((image) => {
            imageData.append('images', image);
        });

        const imageResponse = await axios.post(
          `http://localhost:3001/api/products/${productId}/uploadProductImage`,
          imageData,
          {
            headers: {
              //multipart/form-data: multipart data, used for form data transfer, especially when uploading files.
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (imageResponse.status >= 200 && imageResponse.status < 300) {
          console.log("Images uploaded successfully");
          router.push("/admin/product");
        } else {
            console.error("Error uploading images");
        }

      } 
    } catch (error) {
      console.error("Error adding product(2):", error);
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
    if (formData.images.length === 0) {
      setValidationMessage("Please upload at least one product image.");
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
          <label className="block text-gray-700 mb-2">
            Upload Images (Max: 4)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {imagePreviews.length > 0 && (
            <div className="mt-4 flex space-x-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Product Preview ${index + 1}`}
                    className="w-20 h-12 object-cover border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
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
          <label className="block text-gray-700 mb-2">
            Product Description
          </label>
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
            onClick={handleCancel}
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
