// components/OrderProgress.js

import React from 'react';
import { FaBox, FaCartShopping, FaCircleCheck, FaHouse, FaTruckFast } from 'react-icons/fa6';

const OrderProgress = ({ timestamps }) => {

  // 定义状态阶段的数组，包含状态名称和对应的时间戳键
  const stages = [
    { name: "Ordered", key: "orderDate", source: "order", icon: <FaCartShopping className='w-6 h-6'/> }, // 从订单数据获取
    { name: "Processed", key: "shippedDate", source: "order", icon: <FaCircleCheck className='w-6 h-6'/> }, // 从订单数据获取
    { name: "Pick Up", key: "shipment_info_received", source: "tracking", icon: <FaBox className='w-6 h-6'/> }, // 从API获取
    { name: "In Transit", key: "transit", source: "tracking", icon: <FaTruckFast className='w-6 h-6'/> }, // 从API获取
    { name: "Delivered", key: "delivered", source: "tracking", icon: <FaHouse className='w-6 h-6'/> } // 从API获取
  ];

  console.log('timestamps', timestamps);
  
  // 找到当前状态的索引，以激活之前的所有节点
  //const currentStageIndex = stages.findIndex(stage => timestamps[stage.key] !== undefined);
  // 计算 currentStageIndex
  let currentStageIndex = -1;
  stages.forEach((stage, index) => {
    if (timestamps[stage.key]) {
      currentStageIndex = index; // 更新到最新的时间戳阶段
    }
  });

  return (
    <div className="flex justify-between w-full my-8">
        {stages.map((stage, index) => (
            <React.Fragment key={index}>
              {/* each stages -- icon + name + time */}
                <div className="flex flex-col items-center text-center">
                    {/* status icon */}
                    <div
                        className={`w-6 h-6 flex items-center justify-center ${
                        index <= currentStageIndex ? "text-blue-600" : "text-gray-300"
                        }`}
                    >
                        {stage.icon}
                    </div>
                    {/* status name */}
                    <p className={`mt-2 ${index <= currentStageIndex ? "text-blue-600" : "text-gray-400"}`}>
                        {stage.name}
                    </p>
                    {/* timestamp */}
                    <p className="text-xs text-gray-500 mt-1">
                        {timestamps[stage.key] ? new Date(timestamps[stage.key]).toLocaleString().split(' ')[0] : "--"}
                    </p>
                </div>
                {/* line */}
                {index < stages.length - 1 && (
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