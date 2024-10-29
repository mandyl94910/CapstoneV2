// components/OrderProgress.js

import React from 'react';
import { FaCheck, FaTruck } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

const OrderProgress = ({ status, orderDates }) => {
  // 定义状态阶段的数组，包含状态名称和对应的时间戳键
  const stages = [
    { name: "Ordered", key: "orderDate", icon: <FaCheck className='w-6 h-6'/> },
    { name: "Shipped", key: "shipDate", icon: <FaTruck className='w-6 h-6'/> },
    { name: "Deliveried", key: "completeDate", icon: <FaHouse className='w-6 h-6'/> }
  ];

  // 找到当前状态的索引，以激活之前的所有节点
  let currentStageIndex;
  switch (status) {
    case 'pending':
      currentStageIndex = 0;
      break;
    case 'shipped':
      currentStageIndex = 1;
      break;
    case 'completed':
      currentStageIndex = 2;
      break;
    default:
      currentStageIndex = -1; // 如果 status 不匹配，默认没有进度
  }

  return (
    <div className="flex justify-between w-full my-8">
        {stages.map((stage, index) => (
            <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center">
                    {/* status icon */}
                    <div
                        className={`w-6 h-6 flex items-center justify-center ${
                        index <= currentStageIndex ? "text-blue-600" : "text-gray-300"
                        }`}
                    >
                        {stage.icon}
                        {/* <span className="text-white font-bold">{index + 1}</span> */}
                    </div>
                    {/* status name */}
                    <p className={`mt-2 ${index <= currentStageIndex ? "text-blue-600" : "text-gray-400"}`}>
                        {stage.name}
                    </p>
                    {/* timestamp */}
                    <p className="text-xs text-gray-500 mt-1">
                        {orderDates[stage.key] ? new Date(orderDates[stage.key]).toLocaleString() : "waiting"}
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
