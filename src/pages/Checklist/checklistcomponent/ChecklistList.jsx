import React from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const ChecklistList = ({ onEdit }) => {
  // Fetch all checklists
  const { data, isLoading, refetch } = useGetQuery({
    path: "checklist/get-all",
  });

  const [deleteChecklist] = useDeleteMutation();

  // Edit Checklist Handler
  const onEditChecklist = (record) => {
    const checklist = data.find(({ _id }) => _id === record.id);
    onEdit(checklist);
  };

  // Delete Checklist Handler
  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid checklist ID");
      return;
    }
    try {
      await deleteChecklist({
        path: `checklist/delete/${id}`,
      }).unwrap();
      message.success("Checklist deleted successfully!");
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to delete checklist. Please try again."
      );
    }
  };

  // Map the API response to table data
  const checklists =
    data?.map((checklist) => ({
      id: checklist._id,
      title: checklist.title || "N/A",
      branches:
        checklist.branches?.map((branch) => branch.branchCode).join(", ") ||
        "N/A",
      categories: checklist.categories?.join(", ") || "N/A",
      createdBy:
        `${checklist.createdBy?.firstname || ""} ${
          checklist.createdBy?.lastname || ""
        }`.trim() || "N/A",
      questionsCount: checklist.questions?.length || 0,
    })) || [];

  // Define table columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Branches",
      dataIndex: "branches",
      key: "branches",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Questions",
      dataIndex: "questionsCount",
      key: "questionsCount",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => onEditChecklist(record)}>
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

  // Return Responsive Table
  return (
    <Table
      columns={columns}
      dataSource={checklists}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ChecklistList;
