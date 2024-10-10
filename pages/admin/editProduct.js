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

  const { productId } = router.query;

  // Handles changes to the inputs in the form. 
  //Its purpose is to dynamically update the formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Fetch categories from the API
  //Used to perform rendering-independent behavior in function components
  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
      fetchCategories();
    }
  }, [productId]);
    
    
    
const fetchProductDetails = async (productId ) => {
    try {
    const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
    console.log('Fetched product data:', response.data);
    const product = response.data;

    const basePath = 'http://localhost:3001/images/';
    let imagePaths = product.image ? product.image.split(',').map(path => path.trim()) : [];

    // 生成图片预览 URL
    const imagePreviews = imagePaths.map(path => basePath + path);
    setImagePreviews(imagePreviews); // 用于预览

    setFormData({
    product_name: product.product_name,
    product_description: product.product_description,
    price: product.price,
    quantity: product.quantity,
    category: product.category_id,
    visibility: product.visibility,
    images: imagePaths,
    });
    } catch (error) {
    console.error('Error fetching product details:', error);
    }
};

const fetchCategories = async () => {
    try {
    const response = await axios.get("http://localhost:3001/api/subcategories");
    setCategories(response.data);
    } catch (error) {
    console.error("Failed to fetch categories", error);
    }
};

const handleImageDelete = (index) => {
    // 更新 formData 中的 images 数组
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages
    });
  
    // 更新预览数组
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };


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

    console.log('Current form data:', formData); // 打印当前表单数据
    if (!validateForm()) {
      return;
    }


    // 使用FormData处理文件上传
    const updateform = new FormData();
    updateform.append('product_name', formData.product_name);
    updateform.append('product_description', formData.product_description);
    updateform.append('price', formData.price);
    updateform.append('quantity', formData.quantity);
    updateform.append('category_id', formData.category);
    updateform.append('visibility', formData.visibility);

    let hasNewImages = formData.images.some(image => image instanceof File);
    if (hasNewImages) {
      formData.images.forEach((image) => {
          if (image instanceof File) {
              updateform.append('images', image);
              console.log('File added:', image.name); // 确认文件被添加
          } else {
              console.log('Not a file:', image); // 如果不是文件对象，打印这个信息
          }
      });
    }else {
      // Use old images from imagePreviews if no new files were added
        formData.images.forEach((imagePath) => {
        updateform.append('images', imagePath);
        console.log('use old image path:', imagePath);
      });
    }


    try {
        const response = await axios.put(`http://localhost:3001/api/products/${productId}`, updateform, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        router.push("/admin/product"); // 跳转到产品列表页面
    } catch (error) {
        console.error("Error updating product:", error);
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
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

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
                    key={index}
                    src={preview}
                    alt={`Product Preview ${index + 1}`}
                    className="w-20 h-12 object-cover border border-gray-300 rounded"
                  />
                  <button type="button" onClick={(e) => {
                    e.preventDefault(); // 防止任何默认表单提交行为
                    handleImageDelete(index);
                    }} className="delete-button">
                    delete
                  </button>
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
