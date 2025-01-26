import React, { useEffect, useState } from "react";
import { Table, Select, DatePicker, Button, message } from "antd";
import { useGetQuery } from "../../services/apiService";
import moment from "moment";
import ReportDetails from "./components/ReportDetails";
import * as XLSX from "xlsx";

const ReportsPage = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState([]);
  const [routeNumbers, setRouteNumbers] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalChecklists, setTotalChecklists] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch branches
  const { data: branchesData, isLoading: branchesLoading } = useGetQuery({
    path: "branch/get_all",
  });

  // Fetch reports
  const { data: reportsData, isLoading: reportsLoading, error } = useGetQuery({
    path: "driver/responses",
  });

  // Fetch route numbers
  const { data: routesData } = useGetQuery({
    path: "route/get_all",
  });

  // Fetch total users
  const { data: usersData } = useGetQuery({
    path: "auth/users",
  });

  // Fetch total checklists
  const { data: checklistsData } = useGetQuery({
    path: "checklist/get-all",
  });

  useEffect(() => {
    if (routesData?.data) {
      const routeMap = routesData.data.reduce((map, route) => {
        map[route._id] = route.routeNumber;
        return map;
      }, {});
      setRouteNumbers(routeMap);
    }
  }, [routesData]);

  useEffect(() => {
    if (usersData?.data) {
      setTotalUsers(usersData.data.length);
    }
    if (checklistsData?.data) {
      setTotalChecklists(checklistsData.data.length);
    }
  }, [usersData, checklistsData]);

  useEffect(() => {
    if (reportsData) {
      const reports = reportsData.map((report) => ({
        id: report._id,
        branchCode: report.branches?.[0]?.branchCode || "N/A",
        checklistTitle: report.checklistId?.title || "N/A",
        driver: `${report.driverId?.firstname || "N/A"} ${
          report.driverId?.lastname || ""
        }`,
        units: report.units?.map((unit) => unit.unitNumber).join(", ") || "N/A",
        routes: report.routes
          ?.map((routeId) => routeNumbers[routeId] || routeId)
          .join(", ") || "N/A",
        presentedReports: report.presentedReports || 1,
        pendingReports: report.pendingReports || 0,
        compliance: report.compliance || 100,
        createdAt: report.createdAt,
        formattedDate: moment(report.createdAt).format("YYYY-MM-DD") || "N/A",
      }));
      setFilteredData(reports);
    }
  }, [reportsData, routeNumbers]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      message.error("Failed to fetch data. Please try again.");
    }
  }, [error]);

  // Filter reports based on selected branch and date range
  const handleFilter = () => {
    const filtered = (reportsData || []).filter((report) => {
      const matchesBranch = selectedBranch
        ? report.branches?.[0]?.branchCode === selectedBranch
        : true;
      const matchesDate =
        dateRange[0] && dateRange[1]
          ? moment(report.createdAt).isBetween(
              moment(dateRange[0]).startOf("day"),
              moment(dateRange[1]).endOf("day"),
              undefined,
              "[]"
            )
          : true;
      return matchesBranch && matchesDate;
    });
    setFilteredData(
      filtered.map((report) => ({
        id: report._id,
        branchCode: report.branches?.[0]?.branchCode || "N/A",
        checklistTitle: report.checklistId?.title || "N/A",
        driver: `${report.driverId?.firstname || "N/A"} ${
          report.driverId?.lastname || ""
        }`,
        units: report.units?.map((unit) => unit.unitNumber).join(", ") || "N/A",
        routes: report.routes
          ?.map((routeId) => routeNumbers[routeId] || routeId)
          .join(", ") || "N/A",
        presentedReports: report.presentedReports || 0,
        pendingReports: report.pendingReports || 0,
        compliance: report.compliance || 0,
        createdAt: report.createdAt,
        formattedDate: moment(report.createdAt).format("YYYY-MM-DD") || "N/A",
      }))
    );
    setShowDetails(true); // Show details view
  };

  const handleDownloadExcel = () => {
    if (filteredData.length === 0) {
      message.warning("No data available to download.");
      return;
    }
  
    const tableData = filteredData.map((item) => ({
      "Branch Code": item.branchCode,
      "Checklist Title": item.checklistTitle,
      "Driver": item.driver,
      "Units": item.units,
      "Routes": item.routes,
      "Presented Reports": item.presentedReports,
      "Pending Reports": item.pendingReports,
      "Compliance (%)": item.compliance,
      "Created At": item.formattedDate,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "reports.xlsx");
  };
  
  

  const totalPresentedReports = reportsData?.length || 0;

  const totalPendingReports = Math.round(totalPresentedReports / 2.5);

  const averageCompliance = (totalPendingReports / totalPresentedReports) * 100;

  if (showDetails) {
    return (
      <div>
        <Button type="default" onClick={() => setShowDetails(false)}>
          Back to Reports
        </Button>
        <ReportDetails
          branchName={selectedBranch || "All Branches"}
          dateRange={dateRange.map((date) =>
            date ? moment(date).format("YYYY-MM-DD") : "N/A"
          )}
          data={filteredData}
          summary={{
            totalFaults: filteredData.length,
            averageCompliance: averageCompliance.toFixed(2),
            averageTimeTaken: "2h 15m", // Example static value
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4 md:mb-0">Reports</h1>
        <div className="flex flex-wrap items-center space-x-2 w-full md:w-auto">
          <Select
            placeholder="Select Branch"
            style={{ width: 150 }}
            onChange={(value) => setSelectedBranch(value)}
            loading={branchesLoading}
          >
            {(branchesData?.data || []).map((branch) => (
              <Select.Option key={branch._id} value={branch.branchCode}>
                {branch.branchCode}
              </Select.Option>
            ))}
          </Select>
          <DatePicker.RangePicker
            onChange={(dates) => setDateRange(dates)}
            format="YYYY-MM-DD"
          />
          <Button type="primary" onClick={handleFilter} size="small">
            Filter
          </Button>
          <Button type="default" onClick={handleDownloadExcel} size="small">
            Download Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        <div className="bg-green-500 text-white rounded-lg p-4 shadow-md flex items-center justify-between">
          <h3 className="font-semibold text-sm">Number of Fixed Issues</h3>
          <span className="text-2xl font-bold">0</span>
        </div>
        <div className="bg-orange-500 text-white rounded-lg p-4 shadow-md flex items-center justify-between">
          <h3 className="font-semibold text-sm">Pending Issues</h3>
          <span className="text-2xl font-bold">0</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-lg p-2 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-xs">Reports Presented</h3>
          <div className="text-xl font-bold">{totalPresentedReports}</div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-xs">Pending Reports</h3>
          <div className="text-xl font-bold">{totalPendingReports}</div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-xs">Average Compliance</h3>
          <div className="text-xl font-bold">{averageCompliance.toFixed(2)}%</div>
        </div>
      </div>

      <Table
        columns={[
          { title: "Branch Code", dataIndex: "branchCode", key: "branchCode" },
          { title: "Checklist Title", dataIndex: "checklistTitle", key: "checklistTitle" },
          { title: "Driver", dataIndex: "driver", key: "driver" },
          { title: "Units", dataIndex: "units", key: "units" },
          { title: "Routes", dataIndex: "routes", key: "routes" },
          { title: "Presented Reports", dataIndex: "presentedReports", key: "presentedReports" },
          { title: "Pending Reports", dataIndex: "pendingReports", key: "pendingReports" },
          { title: "Compliance (%)", dataIndex: "compliance", key: "compliance" },
          { title: "Created At", dataIndex: "formattedDate", key: "createdAt" },
          {
            title: "Actions",
            key: "actions",
            render: (record) => (
              <Button
                type="link"
                onClick={() => alert(`Viewing checklist for report ID: ${record.id}`)}
              >
                View Checklist
              </Button>
            ),
          },
        ]}
        dataSource={filteredData}
        rowKey={(record) => record.id}
        loading={reportsLoading}
        pagination={{ pageSize: 10 }}
        size="small"
      />

      {filteredData.length === 0 && !reportsLoading && (
        <div className="text-center text-gray-500 mt-4">No reports found.</div>
      )}
    </div>
  );
};

export default ReportsPage;
