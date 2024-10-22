import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/common/Header';
import axios from 'axios';

/**
 * helped with chatGPT
 * prompt: Create a review page which can retrieve data from order and 
 * display areas for comment for each product in that order
 *         Check if the product is reviewed and disable the submit button for that product
 * @returns 
 */
const ReviewPage = () => {
    const router = useRouter();
    const { orderData, customerId } = router.query; // 获取传递过来的订单数据
    const order = orderData ? JSON.parse(orderData) : {}; // 解析订单数据

    const [hasReviewed, setHasReviewed] = useState({});
    const [ratings, setRatings] = useState({});
    const [contents, setContents] = useState({});

    useEffect(() => {
        if (!order.OrderDetails || !customerId) return;
        const checkIfReviewed = async (productId) => {
            console.log(`frontend customerId: ${customerId} and productId: ${productId}`);
            try {
                const response = await axios.get('http://localhost:3001/api/review/check', {
                    params: {
                        customerId: customerId,
                        productId: productId,
                    }
                });
                console.log(response.data);
                if (response.data.reviewed) {
                    setHasReviewed((prev) => ({
                        ...prev,
                        [productId]: true,
                    }));
                }
            } catch (error) {
                console.error('Error checking reviewed status:', error);
            }
        };
        
        // check review status for all products within the order
        order.OrderDetails.forEach(orderDetail => {
            checkIfReviewed(orderDetail.product_id);
        });
    },[customerId]);

    const handleRatingChange = (productId, newRating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [productId]: newRating,
        }));
    };

    const handleContentChange = (productId, newContent) => {
        setContents((prevContents) => ({
            ...prevContents,
            [productId]: newContent,
        }));
    };

    const handleSubmitReview = async (productId) => {
        const review = {
            customer_id: parseInt(customerId, 10), // 使用传递过来的 customer_id
            product_id: productId, // 使用 product_id
            content: contents[productId], // 从状态中获取评论内容
            rating: ratings[productId],     // 从状态中获取评分
        };
        console.log(review);

        try {
            await axios.post('http://localhost:3001/api/reviews/add', review);
            // 提交成功后的逻辑
            alert('Review submitted successfully!'); 
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.'); // 处理错误
        }
    };

    return (
        <>
            <Header/>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
                {order.OrderDetails && order.OrderDetails.map((orderDetail) => (
                    <div key={orderDetail.product_id} className="border p-4 mb-4 flex">
                        <div className="flex-shrink-0 w-24 h-24">
                            <img 
                                src={`/images/${orderDetail.Product.image.split(',')[0]}`} 
                                alt={orderDetail.name} 
                                className="object-cover w-full h-full rounded" 
                            />
                        </div>
                        <div className="ml-4 flex-grow">
                            <h3 className="font-bold text-lg">{orderDetail.name}</h3>
                            {hasReviewed[orderDetail.product_id] ? (
                                <>
                                <p className='text-gray-500'>You have reviewed this product</p>
                                </>
                            ) : (
                                <>
                                    {/* 星级评分 */}
                                    <div className="flex items-center mb-2">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <span
                                                key={index}
                                                className={`cursor-pointer ${index < (ratings[orderDetail.product_id] || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                                                onClick={() => handleRatingChange(orderDetail.product_id, index + 1)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    {/* 评论输入框 */}
                                    <textarea
                                        placeholder="Enter your review..."
                                        className="w-full border p-2 mb-2"
                                        value={contents[orderDetail.product_id] || ''}
                                        onChange={(e) => handleContentChange(orderDetail.product_id, e.target.value)}
                                    />
                                    <button 
                                        onClick={() => handleSubmitReview(orderDetail.product_id)} 
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                        disabled={hasReviewed[orderDetail.product_id]}
                                    >
                                        Submit Review
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReviewPage;
