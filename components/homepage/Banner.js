// import React from 'react';
// import Image from 'next/image';

// function Banner() {
//   return (
//     <div className="relative h-[500px]">
//       <Image
//         src="/banner.jpg"  // From public folder
//         alt="Banner"
//         //layout="responsive"
//         layout='fill'
//         objectFit='cover'
//         // width={1920}
//         // height={400}
//         className="w-full h-auto px-16 py-6"
//       />
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
//         <h1 className="text-6xl font-extrabold mb-6"> {/* Bold and slightly reduced margin */}
//           20% off headset
//         </h1>
//         <p className="mt-2 text-2xl mb-6">
//           Limited-time offer for July
//         </p>
//         <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"> {/* Adjusted padding and hover effect */}
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Banner;


// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';

// function Banner() {
//   // 定义要展示的图片和文本信息
//   const banners = [
//     { src: '/banner1.jpg', alt: 'Banner 1', title: '20% off headset', 
//       description: 'Limited-time offer for July',
//       positionStyle: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white' },
//     { src: '/banner2.jpg', alt: 'Banner 2', title: 'New Collection', 
//       description: 'Explore the latest trends',
//       positionStyle: '' },
//     { src: '/banner3.jpg', alt: 'Banner 3', title: 'Holiday Deals', 
//       description: 'Up to 50% off on selected items',
//       positionStyle: 'absolute top-1/2 left-1/2 transform -translate-y-1/2 text-left text-white' }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0); // 当前展示的banner索引

//   // 自动轮播逻辑
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // 每3秒切换到下一张图片
//     }, 3000);

//     return () => clearInterval(interval); // 清除interval，避免内存泄漏
//   }, [banners.length]);

//   // 切换到上一张图片
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
//   };

//   // 切换到下一张图片
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//   };

//   return (
//     <div className="relative h-[500px] overflow-hidden">
//       <div className="relative h-full w-full">
//         {/* 渲染当前banner */}
//         {banners.map((banner, index) => (
//           <div
//             key={index}
//             className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
//           >
//             <Image
//               src={banner.src}
//               alt={banner.alt}
//               layout="fill"
//               objectFit="cover"
//               className="w-full h-auto"
//             />
//             <div className={`${banners[currentIndex].positionStyle}`}>
//               <h1 className="text-6xl font-extrabold mb-6">{banner.title}</h1>
//               <p className="mt-2 text-2xl mb-6">{banner.description}</p>
//               <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 左右切换按钮 */}
//       <button
//         className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r-md"
//         onClick={prevSlide}
//       >
//         &#10094; {/* 左箭头符号 */}
//       </button>
//       <button
//         className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l-md"
//         onClick={nextSlide}
//       >
//         &#10095; {/* 右箭头符号 */}
//       </button>
//     </div>
//   );
// }

// export default Banner;



import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick'; // Importing React Slick
import Link from 'next/link';

function Banner() {
  const banners = [
    { src: '/banner1.jpg', alt: 'Banner 1', title: '20% off headset', 
      description: 'Limited-time offer for July',
      textposition: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white',
      titlestyle: '',
      descstyle: '',
      id: 1 
    },
    { src: '/banner2.jpg', alt: 'Banner 2', title: 'New Collection', 
      description: 'Explore the latest trends',
      textposition: 'absolute top-1/2 left-1/2 transform -translate-y-1/2 text-left text-white',
      titlestyle: '',
      descstyle: '',
      id: 2 
     },
    { src: '/banner3.jpg', alt: 'Banner 3', title: 'Holiday Deals', 
      description: 'Up to 50% off on selected items',
      textposition: 'absolute top-1/2 left-1/2 transform -translate-y-1/2  text-left text-white',
      titlestyle: '',
      descstyle: '',
      id: 3 
     }
  ];

  // Slider settings for react-slick
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true, // Enables autoplay
    autoplaySpeed: 3000, // Slide interval (ms)
    arrows: true // Show next/previous arrows
  };

  return (
    <div className="relative h-[500px] px-16 py-6">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative h-[500px]">
            <Image
              src={banner.src}
              alt={banner.alt}
              layout="fill"
              objectFit="cover"
              className="w-full h-auto"
            />
            <div className={`${banner.textposition}`}>
              <h1 className="text-6xl font-extrabold mb-4">{banner.title}</h1>
              <p className="mt-2 text-2xl mb-4">{banner.description}</p>
              <Link href={`/product/${banner.id}`}>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
