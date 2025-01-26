import React, { useState, useMemo } from "react";
import { Table, Select, DatePicker, Card, Row, Col, Empty } from "antd";
import moment from "moment";

const UnitReports = ({ data = [], unit, branchName, dateRange }) => {
  const [selectedBranch, setSelectedBranch] = useState(branchName || null);
  const [dateRangeFilter, setDateRangeFilter] = useState(
    dateRange?.map((date) => moment(date)) || [null, null]
  );

  // Debug incoming data
  console.log("UnitReports - Incoming Data:", data);

  // Filter the data based on selected branch and date range
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesBranch = selectedBranch
        ? item.branchCode === selectedBranch
        : true;

      const matchesDate =
        dateRangeFilter?.[0] && dateRangeFilter?.[1]
          ? moment(item.date).isBetween(
              moment(dateRangeFilter[0]).startOf("day"),
              moment(dateRangeFilter[1]).endOf("day"),
              undefined,
              "[]"
            )
          : true;

      return matchesBranch && matchesDate;
    });
  }, [data, selectedBranch, dateRangeFilter]);

  // Calculate fault statistics for top cards
  const faultStats = useMemo(() => {
    const stats = {};
    filteredData.forEach((item) => {
      if (item.faultDescription) {
        stats[item.faultDescription] = (stats[item.faultDescription] || 0) + 1;
      }
    });

    const totalFaults = Object.values(stats).reduce((sum, count) => sum + count, 0);

    return Object.entries(stats).map(([fault, count]) => ({
      fault,
      count,
      percentage: totalFaults ? ((count / totalFaults) * 100).toFixed(1) : 0,
    }));
  }, [filteredData]);

  // Table columns
  const columns = [
    {
      title: "Branch",
      dataIndex: "branchCode", // Ensure this matches the field name in your data
      key: "branchCode",
      render: (text) => text || "N/A", // Render "N/A" if the field is missing
    },
    {
      title: "Units",
      dataIndex: "units", // Ensure this matches the field name in your data
      key: "units",
      render: (text) => text || "N/A", // Render "N/A" if the field is missing
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY") || "N/A", // Format the date or show "N/A"
    },
    {
      title: "Fault Number",
      dataIndex: "faultNumber",
      key: "faultNumber",
      render: (text) => text || "N/A", // Render "N/A" if the field is missing
    },
    {
      title: "Fault Description",
      dataIndex: "faultDescription",
      key: "faultDescription",
      render: (text) => text || "N/A", // Render "N/A" if the field is missing
    },
  ];
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Fault Reporting by Units</h1>

      {/* Filters Section */}
      <div className="flex justify-end items-center gap-4 mb-4">
        <Select
          placeholder="Select Branch"
          style={{ width: 150 }}
          value={selectedBranch}
          onChange={(value) => setSelectedBranch(value)}
        >
          {[...new Set(data.map((item) => item.branch))].map((branch) => (
            <Select.Option key={branch} value={branch}>
              {branch}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Select Unit"
          style={{ width: 150 }}
          value={unit}
          disabled
        >
          <Select.Option key={unit} value={unit}>
            {unit}
          </Select.Option>
        </Select>
        <DatePicker.RangePicker
          value={
            dateRangeFilter?.[0] && dateRangeFilter?.[1]
              ? [moment(dateRangeFilter[0]), moment(dateRangeFilter[1])]
              : null
          }
          onChange={(dates) => setDateRangeFilter(dates)}
          format="DD MMM - DD MMM"
        />
      </div>

      {/* Fault Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-4">
        {faultStats.map((stat) => (
          <Col key={stat.fault} xs={24} sm={12} md={8}>
            <Card className="shadow-md">
              <h2 className="text-lg font-semibold">{stat.fault}</h2>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-sm text-gray-500">{stat.percentage}% of Total Faults</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Table Section */}
      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.id || Math.random()} // Ensure each row has a unique key
          pagination={{ pageSize: 5 }}
        />
      ) : (
        <Empty description="No reports to display for the selected filters." />
      )}
    </div>
  );
};

export default UnitReports;
