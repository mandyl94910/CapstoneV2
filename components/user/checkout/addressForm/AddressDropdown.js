const AddressDropdown = ({ addresses, value, onChange, error }) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2">
        Choose an existing address
      </label>
      <select
        className={`w-full border ${
          error ? "border-red-500" : "border-slate-400"
        } rounded-lg px-4 py-3`}
        value={value}
        onChange={onChange}
      >
        <option value="">Select an address</option>
        {addresses.map((address) => (
          <option key={address.id} value={address.id}>
            {address.street}, {address.city}, {address.province}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AddressDropdown;
