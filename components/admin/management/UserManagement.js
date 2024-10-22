import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.js router for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // State for users
  const [searchQuery, setSearchQuery] = useState(""); // State for search query input
  const router = useRouter(); // Next.js router for navigation

  const [userStats, setUserStats] = useState({
    totalUsers: "Loading...",
    newUsers: "Loading...",
    withdrawalUsers: "-2", // Static data
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user-admin/datatable"
        );
        setUsers(response.data); // Set user data from API response
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set users to empty array if there's an error
      }
    }

    async function fetchUserStats() {
      try {
        const [totalUsersRes, newUsersRes] = await Promise.all([
          axios.get("http://localhost:3001/api/total-users"),
          axios.get("http://localhost:3001/api/new-users"),
        ]);

        setUserStats({
          totalUsers: totalUsersRes.data.totalUsers,
          newUsers: `+${newUsersRes.data.newUsers}`,
          withdrawalUsers: "-2", // Static data
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }

    fetchUsers(); // Call function to fetch user data
    fetchUserStats(); // Call function to fetch user statistics
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) => {
    // Check if `user.customer_name` or `user.email` includes the search query, ignoring case
    return (
      (user.customer_name &&
        user.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Define the stats array to pass into InfoCards
  const stats = [
    {
      title: "Total Users",
      value: userStats.totalUsers,
      description: "Based on the Data from 2023-05-06",
    },
    {
      title: "New Users",
      value: userStats.newUsers,
      description: `Based on ${new Date().toLocaleDateString("en-CA")}`,
    },
    {
      title: "Withdrawal Users",
      value: userStats.withdrawalUsers,
      description: `Based on ${new Date().toLocaleDateString("en-CA")}`,
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

  const downloadUserExcel = () => {
    window.location.href = "http://localhost:3001/api/export-users";
  };

  return (
    <div className="border-t-2">
      {/* Container for search bar and DataTable */}
      <div className="bg-white p-4 rounded shadow-md">
        {/* Search Bar above the DataTable */}
        <div className="mb-4">
          {/* Search input field */}
          <input
            type="text"
            value={searchQuery} // Bind input value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on user input
            placeholder="🔍 Search by Name or Email" // Search criteria for users
            className="border p-2 rounded w-full"
          />
        </div>

        {/* User Data Table */}
        <DataTable
          columns={["User ID", "User Name", "Email", "Orders"]} // Table columns
          data={filteredUsers.map((user) => {
            // Use filteredUsers instead of the original users state
            return {
              userNo: user.customer_id,
              userName: user.customer_name,
              email: user.email,
              Orders: user.order_count,
            };
          })}
          onEdit={handleEdit} // Handle edit action
          onDelete={handleDelete} // Handle delete action
        />
        <button
            onClick={downloadUserExcel}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Download User Table
          </button>
      </div>
      {/* Info Cards for User Statistics */}
      <InfoCards stats={stats} />{" "}
      {/* Pass the correctly formatted stats array */}
    </div>
  );
};

export default UserManagement;
