import React, { useEffect, useState } from "react";
import { Table, Select, DatePicker, Button, message, Modal } from "antd";
import { useGetQuery } from "../../services/apiService";
import moment from "moment";
import ReportDetails from "./components/ReportDetails";
import * as XLSX from "xlsx";

// Either import the ChecklistDetail component if it exists elsewhere
// import ChecklistDetail from "./components/ChecklistDetail";

// Or create a simple ChecklistDetail component here
const ChecklistDetail = ({ checklistId, visible, onClose }) => {
  const [checklistData, setChecklistData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch checklist details
  const { data, isLoading, error } = useGetQuery({
    path: `driver/checklist/get/${checklistId}`,
    skip: !checklistId
  });

  useEffect(() => {
    if (data) {
      setChecklistData(data);
      setLoading(false);
    }
    if (error) {
      message.error("Failed to load checklist details");
      setLoading(false);
    }
  }, [data, error]);

  return (
    <Modal
      title="Checklist Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      width={800}
    >
      {loading ? (
        <div className="text-center p-4">Loading checklist details...</div>
      ) : checklistData ? (
        <div>
          <h2 className="text-lg font-bold mb-4">{checklistData.title}</h2>
          {checklistData.questions && checklistData.questions.length > 0 ? (
            <Table
              dataSource={checklistData.questions}
              rowKey={(record) => record._id}
              columns={[
                { title: "Question", dataIndex: "question", key: "question" },
                { title: "Type", dataIndex: "type", key: "type" },
                { 
                  title: "Answer", 
                  key: "answer",
                  render: (_, record) => {
                    // Find the corresponding answer from the answers array
                    const answer = checklistData.answers?.find(a => a.questionId === record._id);
                    if (!answer) return "Not answered";
                    
                    switch (record.type) {
                      case "boolean":
                        return answer.value ? "Yes" : "No";
                      case "text":
                        return answer.value || "N/A";
                      case "select":
                        return answer.value || "N/A";
                      default:
                        return "N/A";
                    }
                  }
                }
              ]}
              pagination={false}
            />
          ) : (
            <div className="text-center">No questions found in this checklist.</div>
          )}
        </div>
      ) : (
        <div className="text-center text-red-500">Failed to load checklist data</div>
      )}
    </Modal>
  );
};

const ReportsPage = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState([]);
  const [routeNumbers, setRouteNumbers] = useState({});
  const [selectedChecklistId, setSelectedChecklistId] = useState(null); // State to store the checklistId
  const [isChecklistVisible, setIsChecklistVisible] = useState(false); // State to control visibility of checklist details
  const [selectedResponse, setSelectedResponse] = useState(null); // State for selected response
  const [isResponseVisible, setIsResponseVisible] = useState(false); // State to control visibility of response details

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
      const reports = reportsData?.map((report) => ({
        id: report?._id,
        branchCode: report?.branches?.[0]?.branchCode || "N/A",
        checklistTitle: report?.checklistId?.title || "N/A",
        checklistId: report?.checklistId?._id, // Add this to store the actual checklist ID
        driver: `${report?.driverId?.firstname || "N/A"} ${
          report?.driverId?.lastname || ""
        }`,
        units: report?.units?.map((unit) => unit?.unitNumber)?.join(", ") || "N/A",
        routes: report?.routes?.map((route) => route?.routeNumber)?.join(", ") || "N/A",
        presentedReports: report?.presentedReports || 1,
        pendingReports: report?.pendingReports || 0,
        compliance: report?.compliance || 100,
        createdAt: report?.createdAt,
        formattedDate: moment(report?.createdAt).format("YYYY-MM-DD") || "N/A",
        answers: report?.answers || [], // Store the answers for use in the modal
      }));
      setFilteredData(reports);
    }
  }, [reportsData]);
  
  // Handle API errors
  useEffect(() => {
    if (error) {
      message.error("Failed to fetch data. Please try again.");
    }
  }, [error]);

 const handleFilter = () => {
  if (!dateRange || dateRange.length !== 2 || !dateRange[0] || !dateRange[1]) {
    message.warning("Please select a valid date range.");
    return;
  }

  const startDate = dateRange[0].startOf('day');
  const endDate = dateRange[1].endOf('day');

  // Debug logs
  console.log("Start Date:", startDate.format());
  console.log("End Date:", endDate.format());
  console.log("Original Reports Data:", reportsData);

  // Check if reportsData is directly an array (without .data property)
  const reportsArray = Array.isArray(reportsData) ? reportsData : reportsData?.data;

  if (!Array.isArray(reportsArray)) {
    console.error("reportsData is not in expected format:", reportsData);
    return;
  }

  const filtered = reportsArray.filter((report) => {
    const reportDate = moment(report.createdAt);
    const matchesBranch = selectedBranch
      ? report?.branches?.[0]?.branchCode === selectedBranch
      : true;
    const matchesDate = reportDate.isBetween(startDate, endDate, 'day', '[]');
    
    // Debug log for each report
    console.log("Processing Report:", {
      reportDate: reportDate.format(),
      reportBranch: report?.branches?.[0]?.branchCode,
      matchesBranch,
      matchesDate
    });
    
    return matchesBranch && matchesDate;
  });

  console.log("Filtered results:", filtered);

  const transformedData = filtered.map((report) => ({
    _id: report._id,
    id: report._id,
    branchCode: report?.branches?.[0]?.branchCode || "N/A",
    checklistTitle: report?.checklistId?.title || "N/A",
    checklistId: report?.checklistId?._id,
    driver: `${report?.driverId?.firstname || "N/A"} ${report?.driverId?.lastname || ""}`,
    units: report?.units?.map(unit => unit?.unitNumber)?.join(", ") || "N/A",
    routes: report?.routes?.map(route => route?.routeNumber)?.join(", ") || "N/A",
    presentedReports: report?.presentedReports || 1,
    pendingReports: report?.pendingReports || 0,
    compliance: report?.compliance || 100,
    createdAt: report?.createdAt,
    formattedDate: moment(report?.createdAt).format("YYYY-MM-DD") || "N/A",
    answers: report?.answers || [],
  }));

  setFilteredData(transformedData);
  setDateRange([startDate, endDate]);
  
  localStorage.setItem("selectedDateRange", JSON.stringify([
    startDate.format("YYYY-MM-DD"),
    endDate.format("YYYY-MM-DD")
  ]));

  setShowDetails(true);
};

  // Filter reports based on selected branch and date range
  useEffect(() => {
    const storedDateRange = localStorage.getItem("selectedDateRange");
    if (storedDateRange) {
      const [start, end] = JSON.parse(storedDateRange);
      setDateRange([moment(start), moment(end)]);
    }
  }, []);
  
  const handleViewChecklist = (checklistId) => {
    // Filter the response based on the checklistId
    const response = filteredData.find(report => report.checklistId._id === checklistId);
    if (response) {
      setSelectedResponse(response);
      setIsResponseVisible(true);
    } else {
      message.warning("No response found for this checklist.");
    }
  };

  const handleCloseResponse = () => {
    setIsResponseVisible(false);
    setSelectedResponse(null);
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

  // Add a function to reset filters and data
  const handleBackToReports = () => {
    setShowDetails(false);
    setSelectedBranch(null);
    setDateRange([null, null]);
    
    // Reset filtered data to original reports data
    if (reportsData) {
      const reports = reportsData?.map((report) => ({
        id: report?._id,
        branchCode: report?.branches?.[0]?.branchCode || "N/A",
        checklistTitle: report?.checklistId?.title || "N/A",
        checklistId: report?.checklistId?._id,
        driver: `${report?.driverId?.firstname || "N/A"} ${
          report?.driverId?.lastname || ""
        }`,
        units: report?.units?.map((unit) => unit?.unitNumber)?.join(", ") || "N/A",
        routes: report?.routes?.map((route) => route?.routeNumber)?.join(", ") || "N/A",
        presentedReports: report?.presentedReports || 1,
        pendingReports: report?.pendingReports || 0,
        compliance: report?.compliance || 100,
        createdAt: report?.createdAt,
        formattedDate: moment(report?.createdAt).format("YYYY-MM-DD") || "N/A",
        answers: report?.answers || [],
      }));
      setFilteredData(reports);
    }

    // Clear the stored date range from localStorage
    localStorage.removeItem("selectedDateRange");
  };

  if (showDetails && dateRange[0] && dateRange[1]) {
    return (
      <div>
        <Button type="default" onClick={handleBackToReports}>
          Back to Reports
        </Button>
        <ReportDetails
          branchName={selectedBranch || "All Branches"}
          dateRange={[
            dateRange[0].format("YYYY-MM-DD"),
            dateRange[1].format("YYYY-MM-DD")
          ]}
          data={filteredData}
          summary={{
            totalFaults: filteredData.length,
            averageCompliance: averageCompliance.toFixed(2),
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
          <Button type="primary" onClick={handleFilter} size="small">
            Filter
          </Button>
          <Button type="default" onClick={handleDownloadExcel} size="small">
            Download Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-lg p-2 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-xs">Reports Presented</h3>
          <div className="text-xl font-bold">{totalPresentedReports}</div>
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
            render: (_, record) => (
              <Button
                type="link"
                onClick={() => handleViewChecklist(record.checklistId._id)}
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

      {/* Modal for displaying response details */}
      <Modal
        title={`Response Details for ${selectedResponse?.checklistId.title}`}
        visible={isResponseVisible}
        onCancel={handleCloseResponse}
        footer={null}
        width={800}
      >
        {selectedResponse && (
          <div>
            <h3>Driver: {selectedResponse.driverId ? `${selectedResponse.driverId.firstname} ${selectedResponse.driverId.lastname}` : "N/A"}</h3>
            <h4>Branch: {selectedResponse.branches && selectedResponse.branches.length > 0 ? selectedResponse.branches[0].branchCode : "N/A"}</h4>
            <h4>Unit: {selectedResponse.units && selectedResponse.units.length > 0 ? selectedResponse.units[0].unitNumber : "N/A"}</h4>
            <h4>Route: {selectedResponse.routes && selectedResponse.routes.length > 0 ? selectedResponse.routes[0].routeNumber : "N/A"}</h4>
            <h4>Created At: {moment(selectedResponse.createdAt).format("YYYY-MM-DD")}</h4>
            <h4>Answers:</h4>
            <ul>
              {selectedResponse.answers.map(answer => (
                <li key={answer.questionId}>
                  <strong>Question ID: {answer.questionId}</strong><br />
                  Answer: {answer.answer || "N/A"}<br />
                  Comment: {answer.comment || "N/A"}<br />
                  {answer.uploadedImages.length > 0 && (
                    <div>
                      <strong>Uploaded Images:</strong>
                      {answer.uploadedImages.map((img, index) => (
                        <img key={index} src={img} alt="Uploaded" style={{ width: "100px", margin: "5px" }} />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
        
      {filteredData.length === 0 && !reportsLoading && (
        <div className="text-center text-gray-500 mt-4">No reports found.</div>
      )}
    </div>
  );
};

export default ReportsPage;