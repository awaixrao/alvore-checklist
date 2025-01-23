import React, { useState } from "react";
import { Table, Input, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const RoutesList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "route/get_all",
  });
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [deleteRoute] = useDeleteMutation();

  const routes =
    data?.data.map((route) => ({
      id: route._id, // Map `_id` to `id`
      routeNumber: route.routeNumber,
      economicUnit: route.economicUnit,
      branchCode: route.branch?.branchCode || "N/A", // Handle nested branch field
      branchName: route.branch?.branchName || "N/A", // Handle nested branch name
      user: route.user?.username || "Unassigned", // Extract the username or mark as Unassigned
    })) || [];

  // Search functionality
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = routes.filter((route) =>
      Object.values(route)
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await deleteRoute({
        path: `route/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).unwrap();
      message.success("Route deleted successfully!");
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to delete route. Please try again."
      );
    }
  };

  // Table columns
  const columns = [
    {
      title: "Route Number",
      dataIndex: "routeNumber",
      key: "routeNumber",
      sorter: (a, b) => a.routeNumber.localeCompare(b.routeNumber),
    },
    {
      title: "Economic Unit",
      dataIndex: "economicUnit",
      key: "economicUnit",
      sorter: (a, b) => a.economicUnit.localeCompare(b.economicUnit),
    },
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      key: "branchCode",
      sorter: (a, b) => a.branchCode.localeCompare(b.branchCode),
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      sorter: (a, b) => a.branchName.localeCompare(b.branchName),
    },
    {
      title: "Assigned User",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this route?"
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

  const rowClassName = (record, index) =>
    index % 2 === 0 ? "bg-gray-100" : "bg-white";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
        <Input.Search
          placeholder="Search routes"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }} // Smaller search bar width
        />
      </div>
      <Table
        columns={columns}
        dataSource={searchText ? filteredData : routes}
        rowKey={(record) => record.id}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default RoutesList;
