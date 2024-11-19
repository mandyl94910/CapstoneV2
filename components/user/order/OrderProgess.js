// components/user/order/OrderProgress.js

import React from 'react';
import { FaBox, FaCartShopping, FaCircleCheck, FaHouse, FaTruckFast } from 'react-icons/fa6';


/**
 * Helped by chatGPT
 * Lists the progress stages (Ordered, Processed, Pick Up, etc.) with their corresponding keys, icons, and data sources.
 * Filters the stages to display based on the rules:
        Always show stages with a timestamp.
        Show stages without a timestamp only if they come after the last completed stage.
 */
const OrderProgress = ({ timestamps }) => {

    // Define stages with name, key, source, and icon
    const stages = [
        { name: "Ordered", key: "orderDate", source: "order", icon: <FaCartShopping className='w-6 h-6'/> }, // 从订单数据获取
        { name: "Processed", key: "shippedDate", source: "order", icon: <FaCircleCheck className='w-6 h-6'/> }, // 从订单数据获取
        { name: "Pick Up", key: "shipment_info_received", source: "tracking", icon: <FaBox className='w-6 h-6'/> }, // 从API获取
        { name: "In Transit", key: "transit", source: "tracking", icon: <FaTruckFast className='w-6 h-6'/> }, // 从API获取
        { name: "Delivered", key: "delivered", source: "tracking", icon: <FaHouse className='w-6 h-6'/> } // 从API获取
    ];

    console.log('timestamps', timestamps);
    
    // Calculate lastStageIndex based on available timestamps
    let lastStageIndex = -1;
    stages.forEach((stage, index) => {
        if (timestamps[stage.key]) {
            lastStageIndex = index; // Update to the latest available stage with a timestamp
        }
    });

    // 过滤状态
    const filteredStages = stages.filter((stage, index) => {
        // display rules:
        // 1. always appear if there is timestamp
        // 2. if no timestamp, only display those with index > than currentIndex
        return timestamps[stage.key] || index > lastStageIndex;
    });

    // Calculate currentStageIndex based on available timestamps
    let currentStageIndex = -1;
    filteredStages.forEach((stage, index) => {
        if (timestamps[stage.key]) {
            currentStageIndex = index; 
        }
    });



    return (
        <div className="flex justify-between w-full my-8">
            {filteredStages.map((stage, index) => (
              // React.Fragment won't create new DOM element to affect the layout
                <React.Fragment key={index}>
                    {/* each stages -- icon + name + time */}
                    <div className="flex flex-col items-center text-center">
                        {/* status icon */}
                        <div
                            className={`w-6 h-6 flex items-center justify-center ${
                                timestamps[stage.key] ? "text-blue-600" : "text-gray-300"
                            }`}
                        >
                            {stage.icon}
                        </div>
                        {/* status name */}
                        <p className={`mt-2 ${
                                timestamps[stage.key] ? "text-blue-600" : "text-gray-400"
                            }`}>
                            {stage.name}
                        </p>
                        {/* timestamp */}
                        <p className="text-xs text-gray-500 mt-1">
                            {timestamps[stage.key] ? new Date(timestamps[stage.key]).toLocaleString().split(' ')[0] : "--"}
                        </p>
                    </div>
                    
                    {/* draw a line between each stage */}
                    {index < filteredStages.length - 1 && (
                            <div
                            className={`flex-1 h-[2px] mt-3 rounded ${
                                index < currentStageIndex ? "bg-blue-600" : "bg-gray-300"
                            }`}
                            ></div>
                        )}
                </React.Fragment>
            ))}
        </div>
    );

    

};

export default OrderProgress;
