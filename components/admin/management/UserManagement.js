import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.js router for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import axios from "axios";

const UserManagement = () => {
  // Initial user data
  const [users, setUsers] = useState([]); // State for users
    const router = useRouter(); // Next.js router for navigation
    const [searchQuery, setSearchQuery] = useState(""); // State for search query input
    const [userStats, setUserStats] = useState({
      totalUsers: "Loading...",
      newUsers: "Loading...",
      withdrawalUsers: "-2", // Keep static data
    });

  // Fetch user data when the component mounts
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/api/user-admin/datatable');
        console.log(response.data);
        setUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);  
      }
    }

    async function fetchUserStats() {
      try {
        const [totalUsersRes, newUsersRes] = await Promise.all([
          axios.get('http://localhost:3001/api/total-users'),
          axios.get('http://localhost:3001/api/new-users')
        ]);

        setUserStats({
          totalUsers: totalUsersRes.data.totalUsers,
          newUsers: `+${newUsersRes.data.newUsers}`,
          withdrawalUsers: "-2" // Keep static data
        });

        console.log("Updated userStats:", {
          totalUsers: totalUsersRes.data.totalUsers,
          newUsers: `+${newUsersRes.data.newUsers}`,
          withdrawalUsers: "-2"
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }

    fetchUsers();
    fetchUserStats();
  }, []);


  // User stats information
  const stats = [
    { title: "Total Users", value: userStats.totalUsers, description: `Based on ${new Date().toLocaleDateString()}` },
    { title: "New Users", value: userStats.newUsers, description: `Based on ${new Date().toLocaleDateString()}` },
    { title: "Withdrawal Users", value: userStats.withdrawalUsers, description: "Based on 28 June 2024" },
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
            columns={["User ID", "User Name", "Email","Orders"]}
            data={users.map((user) => {
              return {
                userNo: user.customer_id,
                userName: user.customer_name,
                email: user.email,
                Orders: user.order_count
                // return: user.return,
              };
            })}
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
