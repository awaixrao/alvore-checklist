import React from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const BranchList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "branch/get_all",
  });
  const [deleteBranch] = useDeleteMutation();

  // Map the branches
  const branches =
    data?.data.map((branch) => ({
      id: branch._id, // Map `_id` to `id`
      branchCode: branch.branchCode,
      branchName: branch.branchName,
      branchAddress: branch.branchAddress,
      state: branch.state,
      country: branch.country,
      branchDetails: branch.branchDetails,
      createdAt: branch.createdAt,
      updatedAt: branch.updatedAt,
    })) || [];

  // Handle Delete
  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid branch ID");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      await deleteBranch({
        path: `branch/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).unwrap();

      message.success("Branch deleted successfully!");
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to delete branch. Please try again."
      );
    }
  };

  // Table columns
  const columns = [
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      key: "branchCode",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Address",
      dataIndex: "branchAddress",
      key: "branchAddress",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Details",
      dataIndex: "branchDetails",
      key: "branchDetails",
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
            title="Are you sure you want to delete this branch?"
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
    <Table
      columns={columns}
      dataSource={branches}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      bordered={false}
      rowClassName={rowClassName} // Apply alternating row styles
    />
  );
};

export default BranchList;
