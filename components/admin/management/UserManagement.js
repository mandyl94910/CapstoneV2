//C:\CPRG306\CapstoneV2\components\admin\management\UserManagement.js
import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";

// Initial user data
const initialUserData = [
  {
    user_id: 1,
    user_name: "User 1",
    email: "user1@gmail.com",
    buy: 2,
    return: 0,
  },
  {
    user_id: 2,
    user_name: "User 2",
    email: "user2@gmail.com",
    buy: 3,
    return: 1,
  },
  {
    user_id: 3,
    user_name: "User 3",
    email: "user3@gmail.com",
    buy: 1,
    return: 0,
  },
  {
    user_id: 4,
    user_name: "User 4",
    email: "user4@gmail.com",
    buy: 2,
    return: 0,
  },
  {
    user_id: 5,
    user_name: "User 5",
    email: "user5@gmail.com",
    buy: 4,
    return: 2,
  },
];

// User stats information
const userStats = [
  { title: "Total Users", value: 25, description: "Based on 28 June 2024" },
  { title: "New Users", value: "+3", description: "Based on 28 June 2024" },
  {
    title: "Withdrawal Users",
    value: "-2",
    description: "Based on 28 June 2024",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUserData); // State for users
  const router = useRouter(); // Next.js router for navigation

  // Placeholder for edit functionality
  const handleEdit = (index) => {
    console.log("Edit user:", index);
  };

  // Placeholder for delete functionality
  const handleDelete = (index) => {
    console.log("Delete user:", index);
  };

  // Navigate to Add User page (if needed later)
  const handleAddUser = () => {
    router.push("/admin/addUser"); // Redirect to the Add User page
  };

  return (
    <div className="border-t-2">
      {/* User Data Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={["User ID", "User Name", "Email", "Buy", "Return"]}
          data={users.map((user, index) => ({
            ...user,
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* User Info Cards */}
      <InfoCards stats={userStats} />
    </div>
  );
};

export default UserManagement;
