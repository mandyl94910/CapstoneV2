import React, { useState } from "react";

const EditCredentials = ({ type }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newValue !== confirmValue) {
      alert(`New ${type} and confirmation ${type} do not match!`);
      return;
    }
    alert(`${type} changed successfully!`);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Change {type}</h1>
      <div className="flex flex-col items-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="w-1/3 bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`current${type}`}
            >
              Current {type}
            </label>
            <input
              type="password"
              name={`current${type}`}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`new${type}`}
            >
              New {type}
            </label>
            <input
              type="password"
              name={`new${type}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`confirm${type}`}
            >
              Confirm New {type}
            </label>
            <input
              type="password"
              name={`confirm${type}`}
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCredentials;
