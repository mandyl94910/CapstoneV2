
/**
 * Helped by chatGPT
 * InputField Component
 * 
 * This component represents a single input field with a label, 
 * error message handling, and customizable styling. 
 *
 * Features:
 * - Displays a required indicator next to the label (a red asterisk).
 * - Highlights the input border in red if there is an error.
 * - Displays the error message below the input field if applicable.
 */
const InputField = ({ label, value, onChange, placeholder, error }) => {
  return (
    <div className="mb-3">
      <label className="block text-md font-medium mb-1">
        <span className="text-red-600">*</span>
        {label}
      </label>
      <input
        type="text"
        className={`w-full border 
            ${error ? "border-red-500" : ""} 
            rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
       
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
