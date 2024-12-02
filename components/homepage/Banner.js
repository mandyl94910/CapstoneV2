//\components\homepage\Banner.js
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick'; // Importing React Slick
import Link from 'next/link';

/**
 * Helped with chatGPT
 * This component displays a carousel of promotional banners using the React Slick library.
 * Each banner features an image, title, description, and a "Shop Now" button that links
 *    to a product page. The component supports autoplay, navigation dots.
 */
function Banner() {
  const banners = [
    { src: '/banner1.jpg', alt: 'Banner 1', title: '20% off headset', 
      description: 'Limited-time offer for July',
      textposition: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white',
      titlestyle: '',
      descstyle: '',
      id: '012345678906'
    },
    { src: '/banner2.jpg', alt: 'Banner 2', title: 'New Collection', 
      description: 'Explore the latest trends',
      textposition: 'absolute top-1/2 left-1/2 transform -translate-y-1/2 text-left text-white',
      titlestyle: '',
      descstyle: '',
      id: '012345678918' 
    },
    { src: '/banner3.jpg', alt: 'Banner 3', title: 'Holiday Deals', 
      description: 'Up to 50% off on selected items',
      textposition: 'absolute top-1/2 left-1/2 transform -translate-y-1/2  text-left text-white',
      titlestyle: '',
      descstyle: '',
      id: '012345678919'
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
    arrows: true, // Show next/previous arrows};
  }

  
  return (
    // <div className="relative h-[550px] px-16 py-6">
    <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[550px] px-4 sm:px-8 py-6">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full min-h-[250px] sm:min-h-[350px] md:min-h-[500px]">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0} //only set priority for the first image
            />
            <div className={`${banner.textposition} sm:text-xl md:text-3xl`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl  font-extrabold mb-4">{banner.title}</h1>
              <p className="mt-2 text-base sm:text-lg md:text-2xl mb-4">{banner.description}</p>
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
