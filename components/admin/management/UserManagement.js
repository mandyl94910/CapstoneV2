import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.js router for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // State to hold all user data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query input
  const router = useRouter(); // Next.js router instance

  // Fetch user data when the component mounts
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user-admin/datatable"
        );
        setUsers(response.data.rows); // Set state with fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set state to an empty array if the request fails
      }
    }
    fetchUsers();
  }, []);

  // Filter users based on name and email only
  const filteredUsers = users.filter((user) => {
    return (
      (user.customer_name &&
        user.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // User statistics information
  const userStats = [
    {
      title: "Total Users",
      value: users.length,
      description: "Based on 28 June 2024",
    },
    { title: "New Users", value: "+3", description: "Based on 28 June 2024" },
    {
      title: "Withdrawal Users",
      value: "-2",
      description: "Based on 28 June 2024",
    },
  ];

  // Handle user edit action
  const handleEdit = (index) => {
    console.log("Edit user:", index);
  };

  // Handle user delete action
  const handleDelete = (index) => {
    console.log("Delete user:", index);
  };

  return (
    <div className="border-t-2">
      {/* Container for search and table */}
      <div className="bg-white p-4 rounded shadow-md">
        {/* Search Bar above the DataTable */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
            placeholder="Search by Name or Email" // Adjusted placeholder text
            className="border p-2 rounded w-full" // Styling for the search bar
          />
        </div>

        {/* User Data Table */}
        <DataTable
          columns={["User ID", "User Name", "Email"]} // Display columns for ID, Name, and Email
          data={filteredUsers.map((user, index) => ({
            userNo: user.customer_id, // Display User ID in the table
            userName: user.customer_name,
            email: user.email,
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Info Cards for User Statistics */}
      <InfoCards stats={userStats} />
    </div>
  );
};

export default UserManagement;
