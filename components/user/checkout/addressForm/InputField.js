const InputField = ({ label, value, onChange, placeholder, error }) => {
  return (
    <div className="mb-6">
      <label className="block text-md font-medium mb-1">{label}</label>
      <input
        type="text"
        className={`w-full border ${
          error ? "border-red-500" : "border-slate-400"
        } rounded-lg px-4 py-3`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
