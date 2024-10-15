const SelectField = ({ label, value, onChange, options, error }) => {
  return (
    <div className="mb-6">
      <label className="block text-md font-medium mb-1">{label}</label>
      <select
        className={`w-full border ${
          error ? "border-red-500" : "border-slate-400"
        } rounded-lg px-4 py-3 appearance-none h-13 ${
          value === "" ? "text-gray-500" : "text-black"
        }`} // 처음 선택된 값에 따라 색상 변경
        value={value}
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
