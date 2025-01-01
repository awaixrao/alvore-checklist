import React from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const ChecklistList = ({ onEdit }) => {
  // Fetch all checklists
  const { data, isLoading, refetch } = useGetQuery({
    path: "checklist/get-all", // API endpoint for fetching checklists
  });

  const [deleteChecklist] = useDeleteMutation(); // Delete checklist API hook

  // Map the API response data to table data
  const checklists =
    data?.map((checklist) => ({
      id: checklist._id,
      title: checklist.title,
      branches:
        checklist.branches?.map((branch) => branch.branchCode).join(", ") ||
        "N/A", // Join branch codes
      categories: checklist.categories?.join(", ") || "N/A", // Join categories
      createdBy: `${checklist.createdBy.firstname} ${checklist.createdBy.lastname}`, // Combine firstname and lastname
      questionsCount: checklist.questions?.length || 0, // Count of questions
    })) || [];

  "Mapped Checklists:", checklists; // Debug the mapped data

  // Handle checklist deletion
  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid checklist ID");
      return;
    }
    try {
      await deleteChecklist({
        path: `checklist/delete/${id}`, // API endpoint for deleting
      }).unwrap();
      message.success("Checklist deleted successfully!");
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to delete checklist. Please try again."
      );
    }
  };

  // Define table columns
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Branches", dataIndex: "branches", key: "branches" }, // Show branches
    { title: "Categories", dataIndex: "categories", key: "categories" }, // Show categories
    { title: "Questions", dataIndex: "questionsCount", key: "questionsCount" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" }, // Display creator
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this checklist?"
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

  return (
    <Table
      columns={columns}
      dataSource={checklists}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1200 }}
    />
  );
};

export default ChecklistList;
