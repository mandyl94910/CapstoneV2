


export default function Review(){

    return(
        <div>

        
                {/* ratings and reviews */}
                <div className="mt-8">
                {/* ratings */}
                <h2 className="text-xl font-bold mb-4">Reviews and ratings</h2>
                <div className="flex items-center mb-4">
                <div className="text-4xl font-bold">4.0</div>
                <div className="ml-4">
                    <p className="text-gray-600">based on 46 ratings</p>
                    <div className="flex items-center space-x-2 mt-1">
                    <span className="text-yellow-500">★★★★★</span>
                    </div>
                </div>
                </div>

                {/* reviews */}
                <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                    <div key={review} className="border p-4 rounded-lg">
                        {/* user info - profile + name + rating */}
                        <div className="flex items-center mb-2">
                            <span className="font-bold mr-2">User Name</span>
                            <span className="text-yellow-500">★★★★★</span>
                        </div>
                        {/* review content */}
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet consectetur. Sapien massa cras tristique tortor 
                            misit amet consectetur. Sapien massa cras tristique lorem ipsum dolor sit amet consectetur.
                        </p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}