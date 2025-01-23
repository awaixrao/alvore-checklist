import React, { useState } from "react";
import { Table, Input, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const UserList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "auth/users", // API endpoint to fetch all users
  });
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [deleteUser] = useDeleteMutation();

  // Map users
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

  // Filtered data setup
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid user ID");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      await deleteUser({
        path: `auth/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).unwrap();

      message.success("User deleted successfully!");
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to delete user. Please try again."
      );
    }
  };

  // Table columns
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
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      title: "License Number",
      dataIndex: "licensenumber",
      key: "licensenumber",
      sorter: (a, b) => a.licensenumber.localeCompare(b.licensenumber),
    },
    {
      title: "License Expiration Date",
      dataIndex: "licenseExpirationDate",
      key: "licenseExpirationDate",
      sorter: (a, b) =>
        new Date(a.licenseExpirationDate) - new Date(b.licenseExpirationDate),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            onClick={() => onEdit(record)}
            className="text-blue-600"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Custom row styles for alternating colors
  const rowClassName = (record, index) =>
    index % 2 === 0 ? "bg-gray-100" : "bg-white";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
        <Input.Search
          placeholder="Search users"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }} // Smaller width for the search bar
        />
      </div>
      <Table
        columns={columns}
        dataSource={searchText ? filteredData : users}
        rowKey={(record) => record.id}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        bordered={false}
        rowClassName={rowClassName} // Apply alternating row styles
      />
    </div>
  );
};

export default UserList;
