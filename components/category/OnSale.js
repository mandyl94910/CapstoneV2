import React from 'react';
import Image from "next/image";


export default function OnSale(){

    const products = [
        { id: 1, name: 'phone', image: '/images/onsale/headphones1.jpg'},
        { id: 2, name: 'phone', image: '/images/onsale/headphones.jpg'},
        { id: 3, name: 'phone', image: '/images/onsale/smartwatch.jpg'}
    ]

    return(
        <div className='mt-8 px-16'>
            <hr className='text-gray-300 border-2 mb-4'/>
            <h2 className='text-3xl text-center mb-4 text-gray py-2'>
                On Sales
            </h2>
        
            <div className='h-[750px]'>
                <div className='grid grid-cols-2 gap-x-6'>
                    <div className="relative h-[605px]">
                        <div className='h-[605px]'>
                            <Image
                                src={products[0].image}
                                alt={products[0].name}
                                layout="fill"
                                objectFit="cover"
                                />
                        </div>
                        {/* <div className="absolute top-5 left-5">
                            <h4 className="font-bold text-white">Featured product</h4>
                            <p>
                                <span className='text-red-500 line-through'>$425</span>
                                <span className=' font-bold text-3xl'> $369</span>
                            </p>
                            <button className="bg-blue-500 px-6 py-2 rounded-lg text-white">$10.99</button>
                        </div> */}
                        <div className="pt-4">
                            <h4 className="font-bold">Product</h4>
                            <p className="text-gray-500">Description of top product</p>
                            <p className="font-bold">$10.99</p>
                        </div>
                    </div>


                    <div className="grid h-[750px]">
                        <div className="relative h-[230px]">
                            <div className='h-[230px]'>
                                <Image
                                src={products[1].image} 
                                alt={products[1].name}
                                layout="fill"
                                objectFit="cover"
                                />
                            </div>
                           
                            <div className="pt-4">
                                <h4 className="font-bold">Product</h4>
                                <p className="text-gray-500">Description of top product</p>
                                <p className="font-bold">$10.99</p>
                            </div>
                        </div>
                        <div className="relative h-[230px]">
                            <div className='h-[230px]'>
                                <Image
                                src={products[2].image} 
                                alt={products[2].name}
                                layout="fill"
                                objectFit="cover"
                                />
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold">Product</h4>
                                <p className="text-gray-500">Description of lower product</p>
                                <p className="font-bold">$10.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}