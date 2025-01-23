import React, { useState } from "react";
import { Table, Button, Input, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const BranchList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "branch/get_all",
  });
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  // Filtered data setup
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = branches.filter((branch) =>
      Object.values(branch)
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

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
      sorter: (a, b) => a.branchCode.localeCompare(b.branchCode),
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      sorter: (a, b) => a.branchName.localeCompare(b.branchName),
    },
    {
      title: "Address",
      dataIndex: "branchAddress",
      key: "branchAddress",
      sorter: (a, b) => a.branchAddress.localeCompare(b.branchAddress),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Details",
      dataIndex: "branchDetails",
      key: "branchDetails",
      sorter: (a, b) => a.branchDetails.localeCompare(b.branchDetails),
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
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
        <Input.Search
          placeholder="Search branches"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }} // Smaller width for the search bar
        />
      </div>
      <Table
        columns={columns}
        dataSource={searchText ? filteredData : branches}
        rowKey={(record) => record.id}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        bordered={false}
        rowClassName={rowClassName} // Apply alternating row styles
      />
    </div>
  );
};

export default BranchList;
