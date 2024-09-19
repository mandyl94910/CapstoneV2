import React, { useState } from "react";
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      userNo: 1,
      userName: "User 1",
      email: "user1@gmail.com",
      buy: 2,
      return: 0,
    },
    {
      userNo: 2,
      userName: "User 2",
      email: "user2@gmail.com",
      buy: 3,
      return: 1,
    },
    {
      userNo: 3,
      userName: "User 3",
      email: "user3@gmail.com",
      buy: 1,
      return: 0,
    },
    {
      userNo: 4,
      userName: "User 4",
      email: "user4@gmail.com",
      buy: 2,
      return: 0,
    },
    {
      userNo: 5,
      userName: "User 5",
      email: "user5@gmail.com",
      buy: 4,
      return: 2,
    },
    {
      userNo: 6,
      userName: "User 6",
      email: "user6@gmail.com",
      buy: 1,
      return: 0,
    },
    {
      userNo: 7,
      userName: "User 7",
      email: "user7@gmail.com",
      buy: 5,
      return: 1,
    },
    {
      userNo: 8,
      userName: "User 8",
      email: "user8@gmail.com",
      buy: 3,
      return: 0,
    },
  ]);

  const userColumns = ["User No", "User-name", "E-mail", "Buy", "Return"];

  const handleEdit = (index) => {
    console.log("Edit user:", index);
  };

  const handleDelete = (index) => {
    console.log("Delete user:", index);
    // Add logic to delete the user
  };

  const userStats = [
    { title: "Total Users", value: 25, description: "Based on 28 June 2024" },
    { title: "New Users", value: "+3", description: "Based on 28 June 2024" },
    {
      title: "Withdrawal Users",
      value: "-2",
      description: "Based on 28 June 2024",
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={userColumns}
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <InfoCards stats={userStats} />
    </div>
  );
};

export default UserManagement;
