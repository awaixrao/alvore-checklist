import React, { useState } from "react";
import { Table, Input, Button, message, Popconfirm } from "antd";
import { useGetQuery, useDeleteMutation } from "../../../services/apiService";

const UnitList = ({ onEdit }) => {
  const { data, isLoading, refetch } = useGetQuery({
    path: "car/get_all", // API endpoint for fetching units
  });
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [deleteUnit] = useDeleteMutation(); // Delete unit API hook

  // Fetch vehicle categories
  const { data: categoriesResponse } = useGetQuery({
    path: "vehicle-category/get",
  });
  const vehicleCategories = Array.isArray(categoriesResponse) ? categoriesResponse : [];

  // Map category IDs to names
  const categoryMap = vehicleCategories.reduce((acc, category) => {
    acc[category._id] = category.categoryname; // Assuming category has _id and categoryname
    return acc;
  }, {});

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

  // Search functionality
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = units.filter((unit) =>
      Object.values(unit)
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

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
    {
      title: "Unit Number",
      dataIndex: "unitNumber",
      key: "unitNumber",
      sorter: (a, b) => a.unitNumber.localeCompare(b.unitNumber),
    },
    {
      title: "Plate",
      dataIndex: "plate",
      key: "plate",
      sorter: (a, b) => a.plate.localeCompare(b.plate),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      sorter: (a, b) => a.model.localeCompare(b.model),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      sorter: (a, b) => a.color.localeCompare(b.color),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Insurance Company",
      dataIndex: "insuranceCompany",
      key: "insuranceCompany",
      sorter: (a, b) => a.insuranceCompany.localeCompare(b.insuranceCompany),
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
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      key: "branchCode",
      sorter: (a, b) => a.branchCode.localeCompare(b.branchCode),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (categoryId) => categoryMap[categoryId] || "N/A",
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

  // Alternating row styles
  const rowClassName = (record, index) =>
    index % 2 === 0 ? "bg-gray-100" : "bg-white";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
        <Input.Search
          placeholder="Search units"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }} // Smaller search bar width
        />
      </div>
      <Table
        columns={columns}
        dataSource={searchText ? filteredData : units}
        rowKey={(record) => record.id}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }} // Horizontal scroll for responsiveness
        rowClassName={rowClassName} // Apply alternating row styles
      />
    </div>
  );
};

export default UnitList;
