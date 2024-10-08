import axios from 'axios';
import React, { useEffect, useState } from 'react';

/**
 * helped with chatGPT
 * prompt: how can I render the stars according to the rating that I retrieved from database
 *  how can I render the stars partially according to the average rating
 *  how can I calculate the total ratings that I retrieved from database and calculate the average rating
 */
export default function Review( {productId} ){

    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    const [totalReviews, setTotalReviews] = useState(null);

    useEffect( () => {

        const fetchReviews = async () =>{
            try {
                const response = await axios.get(`http://localhost:3001/api/reviews/${productId}`);
                const fetchReviews = response.data;
                setReviews(fetchReviews);

                // calculate the average rating
                if (fetchReviews.length > 0) {
                    // calculate total rating from fetched reviews
                    // 0 is initial value for acc
                    const totalRating = fetchReviews.reduce((acc, review) => acc + review.rating, 0);
                    const avgRating = totalRating / fetchReviews.length;
                    setAvgRating(avgRating.toFixed(1));
                } else {
                    setAvgRating(0);
                }

                // set total number of reviews
                setTotalReviews(fetchReviews.length);
            } catch (error) {
                console.error('Error fetching reviews by productId:', error); 
            }
        }
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

    return(
        <div>
            {/* ratings and reviews */}
            <div className="mt-8">
                {/* ratings */}
                {avgRating !== null && totalReviews !== null ? (
                    <>
                        <h2 className="text-xl font-bold mb-2">Reviews and ratings</h2>
                        {totalReviews == 0 ? (
                                <p className='mb-6'>No reviews for this product.</p>
                            ) : (
                                <div className="flex items-center mb-8">
                                    <div className="text-4xl font-bold">{avgRating}</div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">based on {totalReviews} ratings</p>
                                        <div className="flex items-center space-x-1 text-xl">
                                            {/* render the full stars */}
                                            {Array.from({ length: fullStars }, (_, index) => (
                                                <span key={index} className="text-yellow-500">★</span>
                                            ))}
        
                                            {/* render the partial star if there is*/}
                                            {hasPartialStar && (
                                                <span 
                                                    style={{
                                                        position: 'relative',
                                                        display: 'inline-block',
                                                        color: '#d1d5db', // gray
                                                    }}>
                                                ★
                                                    <span
                                                        style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        width: `${decimalPart * 100}%`,  // width according to the decimal
                                                        overflow: 'hidden', // hide the part out of decimalPart,
                                                        // so it won't cover the parent gray 
                                                        color: '#fbbf24',  // yellow
                                                        }}
                                                    >
                                                        ★
                                                    </span>
                                                </span>
                                            )}
        
                                            {/* render the gray stars if there is any */}
                                            {Array.from({ length: 5 - fullStars - (hasPartialStar ? 1 : 0) }, (_, index) => (
                                                <span key={index + fullStars} className="text-gray-300">★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                       
                    </>
                ): (
                    <p>Loading reviews...</p>
                )}
               

                {/* reviews */}
                <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="border p-4 rounded-lg">
                        {/* rating info - username + rating + review_time */}
                        <div className='flex justify-between'>
                            {/* user info - profile + name + rating */}
                            <div className="flex items-center mb-2">
                                <span className="font-bold mr-2">{review.Customer.customer_name}</span>
                                {/* rating stars */}
                                <div className='flex'>
                                    {/* render the yellow stars */}
                                    {Array.from({length: review.rating}, (_, index) => (
                                        <span key={index} className="text-yellow-500">★</span>
                                    ))}
                                    {/* render the gray stars */}
                                    {Array.from({ length: 5 - review.rating }, (_, index) => (
                                        <span key={index + review.rating} className="text-gray-300">★</span>
                                    ))}
                                </div>
                            </div>
                            {/* rating time */}
                            <p className="text-gray-500 text-sm">{formatDateTime(review.review_time)}</p>
                        </div>
                        
                        {/* review content */}
                        <p className="text-gray-600">
                            {review.content}
                        </p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}