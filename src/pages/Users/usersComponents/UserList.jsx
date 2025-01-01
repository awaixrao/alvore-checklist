import React from "react";
import { Table } from "antd";
import { useGetQuery } from "../../../services/apiService";

const UserList = () => {
  const { data, isLoading } = useGetQuery({
    path: "auth/users", // API endpoint to fetch all users
  });

  // Adjust mapping to include all necessary fields except password and token
  const users =
    data?.users.map((user) => ({
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      licenseimage: user.licenseimage || "", // Default to empty string if no image
      licensenumber: user.licensenumber || "N/A",
      licenseExpirationDate: user.licenseExpirationDate
        ? new Date(user.licenseExpirationDate).toLocaleDateString()
        : "N/A",
      role: user.role,
      phone: user.phone,
    })) || [];

  const columns = [
    {
      title: "License Image",
      dataIndex: "licenseimage",
      key: "licenseimage",
      render: (text) =>
        text ? (
          <img
            src={text}
            alt="License"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
        ) : (
          "N/A"
        ),
    },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "First Name", dataIndex: "firstname", key: "firstname" },
    { title: "Last Name", dataIndex: "lastname", key: "lastname" },
    {
      title: "License Number",
      dataIndex: "licensenumber",
      key: "licensenumber",
    },
    {
      title: "License Expiration Date",
      dataIndex: "licenseExpirationDate",
      key: "licenseExpirationDate",
    },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default UserList;
