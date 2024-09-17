import React from 'react';
import Image from 'next/image';

function Banner() {
  return (
    <div className="relative">
      <Image
        src="/banner.jpg"  // From public folder
        alt="Banner"
        layout="responsive"
        width={1920}
        height={600}
        className="w-full h-auto"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-6xl font-extrabold mb-6"> {/* Bold and slightly reduced margin */}
          20% off headset
        </h1>
        <p className="mt-2 text-2xl mb-6">
          Limited-time offer for July
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"> {/* Adjusted padding and hover effect */}
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
