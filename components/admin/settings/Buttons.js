import React from "react";
import Link from "next/link";

const Buttons = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      <Link
        href="/admin/settings/editAccount"
        className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm text-center"
      >
        Edit Account Detail
      </Link>
      <Link
        href="/admin/settings/changePin"
        className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm text-center"
      >
        Change PIN-number
      </Link>
      <Link
        href="/admin/settings/changePassword"
        className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm text-center"
      >
        Change Password
      </Link>
      <Link
        href="/"
        className="bg-indigo-400 py-2 px-4 rounded w-64 text-sm text-center"
      >
        Log-out
      </Link>
    </div>
  );
};

export default Buttons;
