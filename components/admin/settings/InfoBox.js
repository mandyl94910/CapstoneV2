import React from "react";

// Component to display any profile detail using children
export default function InfoBox({ title, children }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      {/* Title section with custom background and white text */}
      <div className="p-2 bg-slate-500 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {/* Children content section with custom light background and black text */}
      <div className="p-4 bg-slate-300 text-mg text-gray-600">{children}</div>
    </div>
  );
}
