import React from 'react';

const Buttons = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      <button className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm">
        Edit Account Detail
      </button>
      <button className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm">
        Change PIN-number
      </button>
      <button className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm">
        Change Password
      </button>
      <button className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm">
        Log-out
      </button>
    </div>
  );
};

export default Buttons;
