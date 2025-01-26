import React, { useState } from "react";
import { Table, Card, Select, Button, message, Spin } from "antd";
import moment from "moment";
import { useGetQuery } from "../../../services/apiService";
import UnitReports from "./UnitReports"; // Import UnitReports

const ReportDetails = ({ branchName, dateRange, data, summary }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showUnitReports, setShowUnitReports] = useState(false);

  // Fetch units from the API using useGetQuery
  const { data: unitsData, isLoading: unitsLoading, error: unitsError } = useGetQuery({
    path: "car/get_all",
  });

  // Extract unit numbers from the API response
  const units = Array.isArray(unitsData?.data)
    ? unitsData.data.map((unit) => unit.unitNumber).filter(Boolean)
    : [];

  if (unitsError) {
    message.error("Error fetching units. Please try again.");
  }

  // Filter data for the selected unit
  const filteredReports = data.filter((record) =>
    Array.isArray(record.units)
      ? record.units.some((unit) => unit === selectedUnit)
      : record.units === selectedUnit
  );

  // Handle filtering and rendering UnitReports
  const handleFilterUnit = () => {
    if (selectedUnit) {
      setShowUnitReports(true); // Show UnitReports view
    } else {
      message.warning("Please select a unit to view reports.");
    }
  };

  // Render UnitReports if the flag is true
  if (showUnitReports && selectedUnit) {
    return (
      <div className="p-4">
        <Button type="default" onClick={() => setShowUnitReports(false)} className="mb-4">
          Back to Report Details
        </Button>
        <UnitReports
  data={filteredReports} 
  unit={selectedUnit}
  branchName={branchName}
  dateRange={dateRange}
/>

console.log(filteredReports);

      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{branchName || "All Branches"} - Report Details</h1>
        <div className="flex items-center gap-2">
          {unitsLoading ? (
            <Spin />
          ) : (
            <Select
              placeholder="Select Unit"
              style={{ width: 200 }}
              value={selectedUnit}
              onChange={(value) => setSelectedUnit(value)}
            >
              {units.map((unit) => (
                <Select.Option key={unit} value={unit}>
                  {unit}
                </Select.Option>
              ))}
            </Select>
          )}
          <Button type="primary" onClick={handleFilterUnit}>
            View Unit Reports
          </Button>
        </div>
      </div>

      <p className="text-gray-600">
        Date Range: {dateRange?.[0] || "N/A"} to {dateRange?.[1] || "N/A"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        <Card className="shadow-md">
          <h2 className="text-lg font-semibold">Total Faults</h2>
          <p className="text-2xl font-bold text-red-500">
            {data.reduce((sum, item) => sum + (item?.faultsReported || 0), 0)}
          </p>
        </Card>
        <Card className="shadow-md">
          <h2 className="text-lg font-semibold">Average Compliance</h2>
          <p className="text-2xl font-bold text-green-500">
            {summary?.averageCompliance || "0"}%
          </p>
        </Card>
      </div>

      <Table
        columns={[
          {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => (date ? moment(date).format("YYYY-MM-DD") : "N/A"),
          },
          {
            title: "Units",
            dataIndex: "units",
            key: "units",
            render: (units) =>
              Array.isArray(units)
                ? units.map((unit) => unit || "Unknown Unit").join(", ")
                : units || "N/A",
          },
          {
            title: "Faults Reported",
            dataIndex: "faultsReported",
            key: "faultsReported",
          },
        ]}
        dataSource={data}
        rowKey={(record) => record.id || Math.random()}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ReportDetails;
