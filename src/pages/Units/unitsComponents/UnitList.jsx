import React from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const UnitList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "car/get_all", // API endpoint for fetching units
  });
  const [deleteUnit] = useDeleteMutation(); // Delete unit API hook

  // Map the API response data to table data
  const units =
    data?.data.map((unit) => ({
      id: unit._id, // Map `_id` to `id`
      unitNumber: unit.unitNumber,
      plate: unit.plate,
      brand: unit.brand,
      model: unit.model,
      color: unit.color,
      year: unit.year,
      insuranceCompany: unit.insuranceCompany,
      insuranceUpload: unit.insuranceUpload,
      vehicleCardUpload: unit.vehicleCardUpload,
      branchCode: unit.branch?.branchCode || "N/A", // Safely access branchCode
      category: unit.category || "N/A", // Include the category field
    })) || [];

  // Handle unit deletion
  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid unit ID");
      return;
    }
    try {
      await deleteUnit({
        path: `car/delete/${id}`, // API endpoint for deleting
      }).unwrap();
      message.success("Unit deleted successfully!");
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to delete unit. Please try again."
      );
    }
  };

  // Define table columns
  const columns = [
    { title: "Unit Number", dataIndex: "unitNumber", key: "unitNumber" },
    { title: "Plate", dataIndex: "plate", key: "plate" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "Year", dataIndex: "year", key: "year" },
    {
      title: "Insurance Company",
      dataIndex: "insuranceCompany",
      key: "insuranceCompany",
    },
    {
      title: "Insurance Upload",
      dataIndex: "insuranceUpload",
      key: "insuranceUpload",
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="Insurance"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Vehicle Card Upload",
      dataIndex: "vehicleCardUpload",
      key: "vehicleCardUpload",
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="Vehicle Card"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          "N/A"
        ),
    },
    { title: "Branch Code", dataIndex: "branchCode", key: "branchCode" }, // Display branchCode
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this unit?"
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
      dataSource={units}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1200 }} // Horizontal scroll for responsiveness
    />
  );
};

export default UnitList;
