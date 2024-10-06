import React, { useState,useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import axios from "axios"; 
const UserManagement = () => {
  // Initial user data
  const [users, setUsers] = useState([]); // State for users
    const router = useRouter(); // Next.js router for navigation

  // Fetch users when the component mounts
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
    fetchUsers();
  }, []);

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

        {/* User Info Cards */}
        <InfoCards stats={userStats} />
      </div>
    );
  };
export default UserManagement;
