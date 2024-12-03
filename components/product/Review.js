import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

/**
 * Helped by chatGPT
 * prompt: how can I render the stars according to the rating that I retrieved from database
 *  how can I render the stars partially according to the average rating
 *  how can I calculate the total ratings that I retrieved from database and calculate the average rating
 *
 * Review Component
 * 
 * This component fetches and displays product reviews, including ratings and user comments.
 * It calculates the average rating and the total number of reviews from the fetched data,
 * and allows for rendering star ratings both as full stars and partially filled stars.
 *
 * Props:
 * - productId: The ID of the product for which reviews are being fetched.
 *
 * Features:
 * - Fetches reviews from an API based on the product ID.
 * - Calculates and displays the average rating with a total number of reviews.
 * - Renders star ratings dynamically based on the average rating and individual review ratings.
 * - Formats the review timestamp to a readable format.
 */
export default function Review({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    const [totalReviews, setTotalReviews] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/reviews/${productId}`);
                const reviewsData = response.data?.data || [];
                setReviews(reviewsData);

                // calculate the average rating
                if (reviewsData.length > 0) {
                    const totalRating = reviewsData.reduce((acc, review) => acc + review.rating, 0);
                    const avgRating = totalRating / reviewsData.length;
                    setAvgRating(avgRating.toFixed(1));
                    setTotalReviews(reviewsData.length);
                } else {
                    setAvgRating(0);
                    setTotalReviews(0);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [productId]);

    // function to format review_time
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString();
    }

    // calculate the float
    const fullStars = Math.floor(avgRating);
    const decimalPart = avgRating - fullStars;
    const hasPartialStar = decimalPart > 0;

    return (
        <div>
            {/* ratings and reviews */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-2">Reviews and ratings</h2>
                {totalReviews === 0 ? (
                    <p className="mb-6">No reviews for this product.</p>
                ) : (
                    <>
                        <div className="flex items-center mb-8">
                            <div className="text-4xl font-bold">{avgRating}</div>
                            <div className="ml-4">
                                <p className="text-gray-600">based on {totalReviews} ratings</p>
                                <div className="flex items-center space-x-1 text-xl">
                                    {/* render the full stars */}
                                    {Array.from({ length: fullStars }, (_, index) => (
                                        <span key={index} className="text-yellow-500">★</span>
                                    ))}

                                    {/* render the partial star if there is */}
                                    {hasPartialStar && (
                                        <span className="relative inline-block text-gray-300">
                                            ★
                                            <span
                                                className="absolute left-0 text-yellow-500 overflow-hidden"
                                                style={{ width: `${decimalPart * 100}%` }}
                                            >
                                                ★
                                            </span>
                                        </span>
                                    )}

                                    {/* render the gray stars */}
                                    {Array.from({ length: 5 - fullStars - (hasPartialStar ? 1 : 0) }, (_, index) => (
                                        <span key={`empty-${index}`} className="text-gray-300">★</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* reviews */}
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="border p-4 rounded-lg">
                                    {/* rating info - username + rating + review_time */}
                                    <div className="flex justify-between">
                                        <div className="flex items-center mb-2">
                                            <span className="font-bold mr-2">
                                                {review.Customer?.customer_name || 'Anonymous'}
                                            </span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, index) => (
                                                    <span
                                                        key={index}
                                                        className={index < review.rating ? "text-yellow-500" : "text-gray-300"}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            {formatDateTime(review.review_time)}
                                        </p>
                                    </div>
                                    <p className="text-gray-600">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}