import React from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const RoutesList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "route/get_all",
  });
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

  const columns = [
    { title: "Route Number", dataIndex: "routeNumber", key: "routeNumber" },
    { title: "Economic Unit", dataIndex: "economicUnit", key: "economicUnit" },
    { title: "Branch Code", dataIndex: "branchCode", key: "branchCode" },
    { title: "Branch Name", dataIndex: "branchName", key: "branchName" },
    { title: "Assigned User", dataIndex: "user", key: "user" },
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
    <Table
      columns={columns}
      dataSource={routes}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      rowClassName={rowClassName}
    />
  );
};

export default RoutesList;
