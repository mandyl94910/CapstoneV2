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

  //need slots variables to mark changes of the slot
  const [imageSlots, setImageSlots] = useState([null, null, null, null]); // Array to manage image files per slot
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]); // Array for image previews per slot
  const [validationMessage, setValidationMessage] = useState("");
  const [displayedCategoryName, setdisplayedCategoryName] = useState("");

  const { productId } = router.query;

  // Handles changes to the inputs in the form. 
  //Its purpose is to dynamically update the formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      //spread syntax means copy every elements in formData here in setFormData
      ...prev,
      //[key] : value
      [name]: value,
    }));
  };


  // Fetch categories from the API
  //Used to perform rendering-independent behavior in function components
  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);
    
    
    
const fetchProductDetails = async (productId ) => {
    try {
    const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
    const product = response.data;

    // Assuming there's a route in your backend to fetch category by ID
    const categoryResponse = await axios.get(`http://localhost:3001/api/categories/${product.category_id}`);
    const categoryObj = categoryResponse.data;
    setdisplayedCategoryName(categoryObj.name)

    //retrieves the current timestamp. Date() is an object and getTime() is a function.
    const timestamp = new Date().getTime();
    const basePath = `/images/product/${product.category_id}/${product.product_id}/`;
    //ts is used to preventing Browser Cache Problems, cus the image preview need to be displayed in real time
    const imagePaths = [1, 2, 3, 4].map((num) => `${basePath}${num}.webp?ts=${timestamp}`);
  
    setImagePreviews(imagePaths);
    setImageSlots(imagePaths);
    setFormData({
    product_name: product.product_name,
    product_description: product.product_description,
    price: product.price,
    quantity: product.quantity,
    category: product.category_id,
    visibility: product.visibility,
    images: imagePaths,

    
    });
    console.log('product category is:',categoryObj.name)
    } catch (error) {
    console.error('Error fetching product details:', error);
    }
};

const handleImageDelete = (index) => {
  const updatedSlots = [...imageSlots];
  const updatedPreviews = [...imagePreviews];

  //// Clear the picture file for a specific slot
  updatedSlots[index] = null; 
  //URLs beginning with “blob:” are temporary object URLs. remove them after deletion to release the ram.
  if (imagePreviews[index] && imagePreviews[index].startsWith("blob:")) {
    URL.revokeObjectURL(imagePreviews[index]);
  }
  updatedPreviews[index] = null; 

  setImageSlots(updatedSlots);
  setImagePreviews(updatedPreviews);
  };


  // Handle image file selection and preview
  const handleImageChange = (e,index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedSlots = [...imageSlots];
    updatedSlots[index] = file;

    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = URL.createObjectURL(file);

    // remove the old urls to release the ram.
    if (imagePreviews[index] && imagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]);
    }

    setImageSlots(updatedSlots);
    setImagePreviews(updatedPreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    //stop Page Refresh or Jump
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updateform = new FormData();
    updateform.append('product_name', formData.product_name);
    updateform.append('product_description', formData.product_description);
    updateform.append('price', formData.price);
    updateform.append('quantity', formData.quantity);
    updateform.append('category_id', formData.category);
    updateform.append('visibility', formData.visibility);

    imageSlots.forEach((image,index) => {
      //check if the image is the object of File
      if (image instanceof File) {
        console.log(`Appending image at slotIndex ${index}: ${image.name}`); 
        updateform.append("images", image, (index+1).toString() + '-' + image.name); 

      } else if (image) {
        // Check if it's an existing URL and needs to be sent as a URL
        console.log(`Appending existing image URL at slotIndex ${index}: ${image}`); 
        updateform.append(`imageUrls[${index}]`, image); // Append existing image URLs
      }
    });
    
    try {
        printFormData(updateform);
        //put is more in line with the operational requirements for updating resources
        //POST is used to create new resources, while PUT is used to replace or update existing resources.
        const response = await axios.put(`http://localhost:3001/api/products/${productId}`, updateform, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        //need the father page to refresh
        router.push({pathname: "/admin/product",
          query: { refresh: true },}); 
    } catch (error) {
        console.error("Error updating product:", error);
    }
    };


    // function is used to print all the data in the FormData to debug.
  const printFormData = (formData) => {
    console.log('Printing FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
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
    if (imageSlots.every((slot) => slot === null)) {
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
        className="bg-white p-6 rounded shadow-md w-2/5"
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        {/* Image Upload */}
        <div className="flex justify-between items-center mb-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2 relative">
              <label className="text-gray-700">Image {index + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="w-full p-2 border rounded"
              />
              {imagePreviews[index] && (
                <div className="relative">
                  <img
                    src={imagePreviews[index]}
                    alt={`Product Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-0 right-0 text-black hover:text-gray-700 font-bold rounded-full w-6 h-6 flex items-center justify-center"
                    style={{ background: 'rgba(255, 255, 255, 0.6)', margin: '4px' }}
                  >
                    &times;  {/* This is a Unicode multiplication sign used as a close icon */}
                  </button>
                </div>
              )}
            </div>
          ))}
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
            <input
                type="text"
                name="category"
                value={displayedCategoryName}
                readOnly
                className="w-full p-2 border rounded bg-gray-100" // 使用灰色背景表示不可编辑
            />
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
            Save Changes
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
