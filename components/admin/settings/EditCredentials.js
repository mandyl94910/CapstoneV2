import React, { useState } from "react";

const EditCredentials = ({ type }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     // Validate the format first
    if (!validationForm()) {
      return;
    }
    // Check that the new password matches the confirmation password
    if (newValue !== confirmValue) {
      alert(`New ${type} and confirmation ${type} do not match!`);
      return;
    }
    // Check if the new password is the same as the old one
  if (newValue === currentValue) {
    alert(`New ${type} cannot be the same as the current ${type}!`);
    return;
  }
    // Send data to the backend
  fetch('http://localhost:3001/api/changeCredentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentValue,
      newValue,
      type,  
    }),
  })
  .then(async (res) => {
    // Check the response status code, if it's not 200, there's an error
    if (!res.ok) {
      const errorData = await res.json(); // Get the error message returned by the backend
      alert(errorData.message || 'An error occurred');
      return;
    }

    // Successful processing
    return res.json();
  })
  .then((data) => {
    if (data) {
      alert(data.message); 
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    alert('Failed to change credentials due to a network error');
  });
  };

  // Format of the validation input
  //using Regular Expressions:
  //It can be used to search, match, and replace specific patterns in strings, 
  //and is very powerful and widely used for processing text.

 // Basic components of a Regular Expressions:
// Characters: Ordinary characters or special characters (metacharacters), such as a-z, A-Z, 0-9, *, +, etc.
// Metacharacters: Special characters that define patterns, such as . (matches any character), ^ (matches the start), $ (matches the end), etc.
// Character set: Use square brackets [] to represent a group of characters to match, for example, [a-z] matches lowercase letters.
// Quantifiers: Specifies the number of times a character is repeated, for example, {3} matches exactly three times, {6,15} matches between 6 and 15 times.

  const validationForm = () => {
    const pinRegex = /^[a-zA-Z0-9]{4}$/; // 4 digits or letters
    const passwordRegex = /^[a-zA-Z0-9]{6,15}$/; //6-15 digits or letters

    if (type === 'PIN') {
      // Verify that the PIN is a 4-digit number or letter
      if (!pinRegex.test(newValue)) {
        alert('PIN must be exactly 4 alphanumeric characters!');
        return false;
      }
    } else if (type === 'Password') {
      // Verify that the password is 6-15 digits or letters
      if (!passwordRegex.test(newValue)) {
        alert('Password must be 6-15 alphanumeric characters!');
        return false;
      }
    }
    return true;
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
