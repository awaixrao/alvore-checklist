import React, { useEffect, useState } from "react";
import { Table, Select, Button, message, Modal, Dropdown, Menu, Badge } from "antd";
import { useGetQuery } from "../../services/apiService";
import moment from "moment";
import * as XLSX from "xlsx";
import { 
  DownOutlined, 
  CalendarOutlined, 
  CheckCircleFilled, 
  CloseCircleFilled, 
  WarningFilled,
  QuestionCircleOutlined
} from "@ant-design/icons";

const ReportsPage = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [datePreset, setDatePreset] = useState("thisWeek");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [questionMap, setQuestionMap] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  
  // Store flag item counts
  const [flagItemCounts, setFlagItemCounts] = useState({
    greenFlags: 0,
    orangeFlags: 0,
    redFlags: 0
  });

  // Fetch branches
  const { data: branchesData, isLoading: branchesLoading } = useGetQuery({
    path: "branch/get_all",
  });

  // Fetch reports
  const { data: reportsData, isLoading: reportsLoading, error } = useGetQuery({
    path: "driver/responses",
  });

  // Fetch checklists
  const { data: checklistsData } = useGetQuery({
    path: "checklist/get-all",
  });

  // Helper function to render status icons
  const renderStatusIcon = (status) => {
    if (!status) return <QuestionCircleOutlined style={{ color: "#d9d9d9", fontSize: "18px" }} />;
    
    switch (String(status).toLowerCase()) {
      case "ok":
      case "true":
      case "yes":
        return <CheckCircleFilled style={{ color: "#52c41a", fontSize: "18px" }} />;
      case "not_ok":
      case "false":
      case "no":
        return <CloseCircleFilled style={{ color: "#f5222d", fontSize: "18px" }} />;
      case "warning":
        return <WarningFilled style={{ color: "#faad14", fontSize: "18px" }} />;
      case "n/a":
      case "na":
        return <div className="inline-flex items-center justify-center bg-gray-200 text-gray-600 rounded font-medium px-2">N/A</div>;
      default:
        return status;
    }
  };

  // Function to count flag items in report answers
  const countFlagItems = (report) => {
    let greenFlags = 0;
    let orangeFlags = 0;
    let redFlags = 0;

    if (report?.answers && Array.isArray(report.answers)) {
      report.answers.forEach(answer => {
        // Check for choice values with icons
        if (answer.choices && answer.choices.length > 0) {
          answer.choices.forEach(choice => {
            if (choice.icon) {
              const iconLower = choice.icon.toLowerCase();
              if (iconLower === 'ok') {
                greenFlags++;
              } else if (iconLower === 'warning') {
                orangeFlags++;
              } else if (iconLower === 'not_ok') {
                redFlags++;
              }
            }
          });
        } 
        // Check for direct answer value if no icon in choices
        else if (answer.answer) {
          const answerLower = answer.answer.toLowerCase();
          if (answerLower === 'ok' || answerLower === 'yes' || answerLower === 'true' || 
              answerLower === 'correcto' || answerLower.includes('ok')) {
            greenFlags++;
          } else if (answerLower === 'warning' || answerLower === 'neutral') {
            orangeFlags++;
          } else if (answerLower === 'not_ok' || answerLower === 'no' || answerLower === 'false' || 
                    answerLower === 'incorrecto' || answerLower.includes('not ok')) {
            redFlags++;
          }
        }
      });
    }

    return { greenFlags, orangeFlags, redFlags };
  };

  // Create a map of question IDs to question text
  useEffect(() => {
    if (checklistsData?.data) {
      const questionsMap = {};
      
      checklistsData.data.forEach(checklist => {
        if (checklist.questions && checklist.questions.length > 0) {
          checklist.questions.forEach(question => {
            questionsMap[question._id] = question.label || question.question || "Unnamed Question";
          });
        }
      });
      
      setQuestionMap(questionsMap);
    }
  }, [checklistsData]);

  // Process report data and count flags
  useEffect(() => {
    if (reportsData) {
      const reports = Array.isArray(reportsData) ? reportsData : reportsData?.data || [];
      
      const processedReports = reports.map((report) => {
        const { greenFlags, orangeFlags, redFlags } = countFlagItems(report);
        
        return {
          id: report?._id,
          branchCode: report?.branches?.[0]?.branchCode || "N/A",
          checklistTitle: report?.checklistId?.title || "N/A",
          checklistId: report?.checklistId?._id,
          driver: `${report?.driverId?.firstname || "N/A"} ${
            report?.driverId?.lastname || ""
          }`,
          units: report?.units?.map((unit) => unit?.unitNumber)?.join(", ") || "N/A",
          unitsList: report?.units || [],
          routes: report?.routes?.map((route) => route?.routeNumber)?.join(", ") || "N/A",
          createdAt: report?.createdAt,
          formattedDate: moment(report?.createdAt).format("YYYY-MM-DD") || "N/A",
          answers: report?.answers?.map(answer => ({
            ...answer,
            questionLabel: answer.questionLabel || questionMap[answer.questionId] || "Unnamed Question"
          })) || [], 
          questions: report?.checklistId?.questions || [],
          uploadedImages: report?.uploadedImages || [],
          greenFlags,
          orangeFlags,
          redFlags
        };
      });
      
      setFilteredData(processedReports);
      
      // Calculate total flag items across all reports
      const totalFlags = processedReports.reduce(
        (acc, report) => {
          acc.greenFlags += report.greenFlags;
          acc.orangeFlags += report.orangeFlags;
          acc.redFlags += report.redFlags;
          return acc;
        },
        { greenFlags: 0, orangeFlags: 0, redFlags: 0 }
      );
      
      setFlagItemCounts(totalFlags);
    }
  }, [reportsData, questionMap]);
  
  // Handle API errors
  useEffect(() => {
    if (error) {
      message.error("Failed to fetch data. Please try again.");
    }
  }, [error]);

  // Function to set date preset without applying filter
  const handleDatePresetChange = (preset) => {
    let startDate, endDate;
    
    switch (preset) {
      case "today":
        startDate = moment().startOf('day');
        endDate = moment().endOf('day');
        break;
      case "yesterday":
        startDate = moment().subtract(1, 'days').startOf('day');
        endDate = moment().subtract(1, 'days').endOf('day');
        break;
      case "thisWeek":
        startDate = moment().startOf('week');
        endDate = moment().endOf('day');
        break;
      case "lastWeek":
        startDate = moment().subtract(1, 'week').startOf('week');
        endDate = moment().subtract(1, 'week').endOf('week');
        break;
      case "thisMonth":
        startDate = moment().startOf('month');
        endDate = moment().endOf('day');
        break;
      case "lastMonth":
        startDate = moment().subtract(1, 'month').startOf('month');
        endDate = moment().subtract(1, 'month').endOf('month');
        break;
      case "last30Days":
        startDate = moment().subtract(30, 'days').startOf('day');
        endDate = moment().endOf('day');
        break;
      default:
        return;
    }
    
    setDateRange([startDate, endDate]);
    setDatePreset(preset);
    
    // Store the selection in localStorage but don't apply filter automatically
    localStorage.setItem("selectedDatePreset", preset);
    localStorage.setItem("selectedDateRange", JSON.stringify([
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD")
    ]));
  };

  // Function to apply filters
  const applyFilter = (startDate, endDate) => {
    if (!startDate || !endDate) {
      message.warning("Please select a valid date range.");
      return;
    }

    // Check if reportsData is directly an array
    const reportsArray = Array.isArray(reportsData) ? reportsData : reportsData?.data || [];

    if (!Array.isArray(reportsArray)) {
      console.error("reportsData is not in expected format:", reportsData);
      return;
    }

    const filtered = reportsArray.filter((report) => {
      const reportDate = moment(report.createdAt);
      
      // Branch filter
      const matchesBranch = selectedBranch
        ? report?.branches?.[0]?.branchCode === selectedBranch
        : true;
      
      // Date filter
      const matchesDate = reportDate.isBetween(startDate, endDate, 'day', '[]');
      
      return matchesBranch && matchesDate;
    });

    const transformedData = filtered.map((report) => {
      const { greenFlags, orangeFlags, redFlags } = countFlagItems(report);
      
      return {
        _id: report._id,
        id: report._id,
        branchCode: report?.branches?.[0]?.branchCode || "N/A",
        checklistTitle: report?.checklistId?.title || "N/A",
        checklistId: report?.checklistId?._id,
        driver: `${report?.driverId?.firstname || "N/A"} ${report?.driverId?.lastname || ""}`,
        units: report?.units?.map(unit => unit?.unitNumber)?.join(", ") || "N/A",
        unitsList: report?.units || [],
        routes: report?.routes?.map(route => route?.routeNumber)?.join(", ") || "N/A",
        createdAt: report?.createdAt,
        formattedDate: moment(report?.createdAt).format("YYYY-MM-DD") || "N/A",
        answers: report?.answers?.map(answer => ({
          ...answer,
          questionLabel: answer.questionLabel || questionMap[answer.questionId] || "Unnamed Question"
        })) || [],
        questions: report?.checklistId?.questions || [],
        greenFlags,
        orangeFlags,
        redFlags
      };
    });

    setFilteredData(transformedData);
    
    // Calculate total flag items for filtered data
    const totalFlags = transformedData.reduce(
      (acc, report) => {
        acc.greenFlags += report.greenFlags;
        acc.orangeFlags += report.orangeFlags;
        acc.redFlags += report.redFlags;
        return acc;
      },
      { greenFlags: 0, orangeFlags: 0, redFlags: 0 }
    );
    
    setFlagItemCounts(totalFlags);
    
    localStorage.setItem("selectedBranch", selectedBranch || "");

    setShowDetails(true);
  };

  // Handle filter click
  const handleFilter = () => {
    if (!dateRange || dateRange.length !== 2 || !dateRange[0] || !dateRange[1]) {
      message.warning("Please select a valid date range.");
      return;
    }

    const startDate = dateRange[0].startOf('day');
    const endDate = dateRange[1].endOf('day');
    
    applyFilter(startDate, endDate);
  };

  // Load previously selected filters from localStorage
  useEffect(() => {
    const storedDatePreset = localStorage.getItem("selectedDatePreset");
    const storedBranch = localStorage.getItem("selectedBranch");
    
    if (storedBranch && storedBranch !== "") {
      setSelectedBranch(storedBranch);
    }
    
    if (storedDatePreset) {
      setDatePreset(storedDatePreset);
      
      // Set the date range based on stored preset without applying filter
      let startDate, endDate;
      
      switch (storedDatePreset) {
        case "today":
          startDate = moment().startOf('day');
          endDate = moment().endOf('day');
          break;
        case "yesterday":
          startDate = moment().subtract(1, 'days').startOf('day');
          endDate = moment().subtract(1, 'days').endOf('day');
          break;
        case "thisWeek":
          startDate = moment().startOf('week');
          endDate = moment().endOf('day');
          break;
        case "lastWeek":
          startDate = moment().subtract(1, 'week').startOf('week');
          endDate = moment().subtract(1, 'week').endOf('week');
          break;
        case "thisMonth":
          startDate = moment().startOf('month');
          endDate = moment().endOf('day');
          break;
        case "lastMonth":
          startDate = moment().subtract(1, 'month').startOf('month');
          endDate = moment().subtract(1, 'month').endOf('month');
          break;
        case "last30Days":
          startDate = moment().subtract(30, 'days').startOf('day');
          endDate = moment().endOf('day');
          break;
        default:
          startDate = moment().startOf('week');
          endDate = moment().endOf('day');
          break;
      }
      
      setDateRange([startDate, endDate]);
    } else {
      // Default to "thisWeek" if nothing is stored, but don't apply filter
      const startDate = moment().startOf('week');
      const endDate = moment().endOf('day');
      setDateRange([startDate, endDate]);
      setDatePreset("thisWeek");
    }
  }, []);
  const handleViewChecklist = (checklistId) => {
    // Get the specific response for this checklist
    const response = filteredData.find(report => report.checklistId === checklistId);
    
    if (response) {
      setSelectedResponse(response);
      setIsResponseVisible(true);
    } else {
      message.warning("No response found for this checklist.");
    }
  };
  const handleViewReport = (reportId) => {
    // Get the specific response for this report
    const response = filteredData.find(report => report.id === reportId);
    
    if (response) {
      setSelectedResponse(response);
      setIsResponseVisible(true);
    } else {
      message.warning("No response found for this report.");
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
      "Green Flag Items": item.greenFlags,
      "Orange Flag Items": item.orangeFlags,
      "Red Flag Items": item.redFlags,
      "Created At": item.formattedDate,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "reports.xlsx");
  };
  
  // Reset filters and data
  const handleBackToReports = () => {
    setShowDetails(false);
    setSelectedBranch(null);
    
    // Reset to this week as default
    const startDate = moment().startOf('week');
    const endDate = moment().endOf('day');
    setDateRange([startDate, endDate]);
    setDatePreset("thisWeek");
    
    // Reset filtered data to original reports data
    if (reportsData) {
      const reports = Array.isArray(reportsData) ? reportsData : reportsData?.data || [];
      
      const processedReports = reports.map((report) => {
        const { greenFlags, orangeFlags, redFlags } = countFlagItems(report);
        
        return {
          id: report?._id,
          branchCode: report?.branches?.[0]?.branchCode || "N/A",
          checklistTitle: report?.checklistId?.title || "N/A",
          checklistId: report?.checklistId?._id,
          driver: `${report?.driverId?.firstname || "N/A"} ${
            report?.driverId?.lastname || ""
          }`,
          units: report?.units?.map((unit) => unit?.unitNumber)?.join(", ") || "N/A",
          unitsList: report?.units || [],
          routes: report?.routes?.map((route) => route?.routeNumber)?.join(", ") || "N/A",
          createdAt: report?.createdAt,
          formattedDate: moment(report?.createdAt).format("YYYY-MM-DD") || "N/A",
          answers: report?.answers?.map(answer => ({
            ...answer,
            questionLabel: answer.questionLabel || questionMap[answer.questionId] || "Unnamed Question"
          })) || [],
          questions: report?.checklistId?.questions || [],
          greenFlags,
          orangeFlags,
          redFlags
        };
      });
      
      setFilteredData(processedReports);
      
      // Calculate total flag items for all data
      const totalFlags = processedReports.reduce(
        (acc, report) => {
          acc.greenFlags += report.greenFlags;
          acc.orangeFlags += report.orangeFlags;
          acc.redFlags += report.redFlags;
          return acc;
        },
        { greenFlags: 0, orangeFlags: 0, redFlags: 0 }
      );
      
      setFlagItemCounts(totalFlags);
    }

    // Update localStorage
    localStorage.setItem("selectedDatePreset", "thisWeek");
    localStorage.setItem("selectedDateRange", JSON.stringify([
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD")
    ]));
    localStorage.setItem("selectedBranch", "");
  };

  // Get a friendly name for the date preset to display
  const getDatePresetDisplayName = () => {
    switch (datePreset) {
      case "today": return "Today";
      case "yesterday": return "Yesterday";
      case "thisWeek": return "This Week";
      case "lastWeek": return "Last Week";
      case "thisMonth": return "This Month";
      case "lastMonth": return "Last Month";
      case "last30Days": return "Last 30 Days";
      default: return "Select Period";
    }
  };

  // Generate the date range menu items
  const dateRangeMenu = (
    <Menu 
      onClick={({ key }) => handleDatePresetChange(key)}
      selectedKeys={[datePreset]}
    >
      <Menu.Item key="today">Today</Menu.Item>
      <Menu.Item key="yesterday">Yesterday</Menu.Item>
      <Menu.Item key="thisWeek">This Week</Menu.Item>
      <Menu.Item key="lastWeek">Last Week</Menu.Item>
      <Menu.Item key="thisMonth">This Month</Menu.Item>
      <Menu.Item key="lastMonth">Last Month</Menu.Item>
      <Menu.Item key="last30Days">Last 30 Days</Menu.Item>
    </Menu>
  );

  const ReportDetails = ({ data, onViewReport }) => {
    return (
      <div className="mt-4">
        <Table
          columns={[
            { title: "Branch Code", dataIndex: "branchCode", key: "branchCode" },
            { title: "Checklist Title", dataIndex: "checklistTitle", key: "checklistTitle" },
            { title: "Driver", dataIndex: "driver", key: "driver" },
            { title: "Units", dataIndex: "units", key: "units" },
            { title: "Routes", dataIndex: "routes", key: "routes" },
            { 
              title: () => (
                <div className="flex items-center">
                  <CheckCircleFilled style={{ color: "#52c41a", fontSize: "16px", marginRight: "4px" }} />
                  <span>Green Flags</span>
                </div>
              ),
              dataIndex: "greenFlags", 
              key: "greenFlags",
              render: (value) => (
                <Badge count={value} style={{ backgroundColor: '#52c41a' }} />
              )
            },
            { 
              title: () => (
                <div className="flex items-center">
                  <WarningFilled style={{ color: "#faad14", fontSize: "16px", marginRight: "4px" }} />
                  <span>Orange Flags</span>
                </div>
              ),
              dataIndex: "orangeFlags", 
              key: "orangeFlags",
              render: (value) => (
                <Badge count={value} style={{ backgroundColor: '#faad14' }} />
              )
            },
            { 
              title: () => (
                <div className="flex items-center">
                  <CloseCircleFilled style={{ color: "#f5222d", fontSize: "16px", marginRight: "4px" }} />
                  <span>Red Flags</span>
                </div>
              ),
              dataIndex: "redFlags", 
              key: "redFlags",
              render: (value) => (
                <Badge count={value} style={{ backgroundColor: '#f5222d' }} />
              )
            },
            { title: "Created At", dataIndex: "formattedDate", key: "createdAt" },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <Button
                  type="link"
                  onClick={() => handleViewChecklist(record.checklistId)}
                  >
                  View Report
                </Button>
              ),
            },
          ]}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={{ pageSize: 10 }}
          size="small"
          summary={(pageData) => {
            let totalGreen = 0;
            let totalOrange = 0;
            let totalRed = 0;
            
            pageData.forEach(({ greenFlags, orangeFlags, redFlags }) => {
              totalGreen += greenFlags || 0;
              totalOrange += orangeFlags || 0;
              totalRed += redFlags || 0;
            });
            
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <strong>Total:</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <div className="flex items-center">
                      <CheckCircleFilled style={{ color: "#52c41a", fontSize: "16px", marginRight: "4px" }} />
                      <Badge count={totalGreen} style={{ backgroundColor: '#52c41a' }} />
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <div className="flex items-center">
                      <WarningFilled style={{ color: "#faad14", fontSize: "16px", marginRight: "4px" }} />
                      <Badge count={totalOrange} style={{ backgroundColor: '#faad14' }} />
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <div className="flex items-center">
                      <CloseCircleFilled style={{ color: "#f5222d", fontSize: "16px", marginRight: "4px" }} />
                      <Badge count={totalRed} style={{ backgroundColor: '#f5222d' }} />
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} colSpan={2}></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
           );
          }}
        />
      </div>
    );
  };

  if (showDetails && dateRange[0] && dateRange[1]) {
    return (
      <div>
        <Button type="default" onClick={handleBackToReports} className="mb-4">
          Back to Reports
        </Button>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {selectedBranch ? `Branch: ${selectedBranch}` : "All Branches"}
          </h2>
          <p>
            Date Range: {dateRange[0].format("YYYY-MM-DD")} to {dateRange[1].format("YYYY-MM-DD")}
          </p>
        </div>
        
        {/* Flag Items Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md border border-green-500 flex flex-col items-center">
            <h3 className="font-semibold text-sm mb-2 text-green-600">GREEN FLAG ITEMS</h3>
            <div className="flex items-center">
              <CheckCircleFilled style={{ color: "#52c41a", fontSize: "16px", marginRight: "4px" }} />
              <div className="text-2xl font-bold text-green-600">
                {flagItemCounts.greenFlags}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md border border-orange-500 flex flex-col items-center">
            <h3 className="font-semibold text-sm mb-2 text-orange-600">ORANGE FLAG ITEMS</h3>
            <div className="flex items-center">
              <WarningFilled style={{ color: "#faad14", fontSize: "16px", marginRight: "4px" }} />
              <div className="text-2xl font-bold text-orange-600">
                {flagItemCounts.orangeFlags}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md border border-red-500 flex flex-col items-center">
            <h3 className="font-semibold text-sm mb-2 text-red-600">RED FLAG ITEMS</h3>
            <div className="flex items-center">
              <CloseCircleFilled style={{ color: "#f5222d", fontSize: "16px", marginRight: "4px" }} />
              <div className="text-2xl font-bold text-red-600">
                {flagItemCounts.redFlags}
              </div>
            </div>
          </div>
        </div>
        
        <ReportDetails
          data={filteredData}
          onViewReport={handleViewChecklist}
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
            value={selectedBranch}
            onChange={(value) => setSelectedBranch(value)}
            loading={branchesLoading}
            allowClear
          >
            {(branchesData?.data || []).map((branch) => (
              <Select.Option key={branch._id} value={branch.branchCode}>
                {branch.branchCode}
              </Select.Option>
            ))}
          </Select>
          
          <Dropdown overlay={dateRangeMenu} trigger={['click']}>
            <Button style={{ marginRight: 8 }}>
              <CalendarOutlined /> {getDatePresetDisplayName()} <DownOutlined />
            </Button>
          </Dropdown>
          
          <Button type="primary" onClick={handleFilter}>
            Apply Filters
          </Button>
          
          <Button type="default" onClick={handleDownloadExcel} size="default">
            Download Excel
          </Button>
        </div>
      </div>

      {/* Flag Items Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-sm mb-2">Reports Count</h3>
          <div className="text-2xl font-bold">{filteredData.length}</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md border border-green-500 flex flex-col items-center">
          <h3 className="font-semibold text-sm mb-2 text-green-600">GREEN FLAG ITEMS</h3>
          <div className="flex items-center">
            <CheckCircleFilled style={{ color: "#52c41a", fontSize: "16px", marginRight: "4px" }} />
            <div className="text-2xl font-bold text-green-600">
              {flagItemCounts.greenFlags}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md border border-orange-500 flex flex-col items-center">
          <h3 className="font-semibold text-sm mb-2 text-orange-600">ORANGE FLAG ITEMS</h3>
          <div className="flex items-center">
            <WarningFilled style={{ color: "#faad14", fontSize: "16px", marginRight: "4px" }} />
            <div className="text-2xl font-bold text-orange-600">
              {flagItemCounts.orangeFlags}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border border-red-500 flex flex-col items-center">
          <h3 className="font-semibold text-sm mb-2 text-red-600">RED FLAG ITEMS</h3>
          <div className="flex items-center">
            <CloseCircleFilled style={{ color: "#f5222d", fontSize: "16px", marginRight: "4px" }} />
            <div className="text-2xl font-bold text-red-600">
              {flagItemCounts.redFlags}
            </div>
          </div>
        </div>
      </div>

      <Table
        columns={[
          { title: "Branch Code", dataIndex: "branchCode", key: "branchCode" },
          { title: "Checklist Title", dataIndex: "checklistTitle", key: "checklistTitle" },
          { title: "Driver", dataIndex: "driver", key: "driver" },
          { title: "Units", dataIndex: "units", key: "units" },
          { title: "Routes", dataIndex: "routes", key: "routes" },
          { 
            title: () => (
              <div className="flex items-center">
                <CheckCircleFilled style={{ color: "#52c41a", fontSize: "16px", marginRight: "4px" }} />
                <span>Green Flags</span>
              </div>
            ),
            dataIndex: "greenFlags", 
            key: "greenFlags",
            render: (value) => (
              <Badge count={value} style={{ backgroundColor: '#52c41a' }} />
            )
          },
          { 
            title: () => (
              <div className="flex items-center">
                <WarningFilled style={{ color: "#faad14", fontSize: "16px", marginRight: "4px" }} />
                <span>Orange Flags</span>
              </div>
            ),
            dataIndex: "orangeFlags", 
            key: "orangeFlags",
            render: (value) => (
              <Badge count={value} style={{ backgroundColor: '#faad14' }} />
            )
          },
          { 
            title: () => (
              <div className="flex items-center">
                <CloseCircleFilled style={{ color: "#f5222d", fontSize: "16px", marginRight: "4px" }} />
                <span>Red Flags</span>
              </div>
            ),
            dataIndex: "redFlags", 
            key: "redFlags",
            render: (value) => (
              <Badge count={value} style={{ backgroundColor: '#f5222d' }} />
            )
          },
          { title: "Created At", dataIndex: "formattedDate", key: "createdAt" },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Button
                type="link"
                onClick={() => handleViewChecklist(record.checklistId)}
              >
                View Report
              </Button>
            ),
          },
        ]}
        dataSource={filteredData}
        rowKey={(record) => record.id}
        loading={reportsLoading}
        pagination={{ pageSize: 10 }}
        size="small"
        summary={(pageData) => {
          let totalGreen = 0;
          let totalOrange = 0;
          let totalRed = 0;
          
          pageData.forEach(({ greenFlags, orangeFlags, redFlags }) => {
            totalGreen += greenFlags || 0;
            totalOrange += orangeFlags || 0;
            totalRed += redFlags || 0;
          });
          
       
        }}
      />


      {/* Modal for displaying response details */}
      <Modal
        title={`Response Details for ${selectedResponse?.checklistTitle}`}
        open={isResponseVisible}
        onCancel={handleCloseResponse}
        footer={null}
        width={800}
      >
        {selectedResponse && (
          <div>
            <h3>Driver: {selectedResponse.driver}</h3>
            <h4>Branch: {selectedResponse.branchCode}</h4>
            <h4>Units: {selectedResponse.units}</h4>
            <h4>Routes: {selectedResponse.routes}</h4>
            <h4>Created At: {selectedResponse.formattedDate}</h4>
            <h4 className="mt-4 mb-2 font-bold">Answers:</h4>
            
            <Table
              dataSource={selectedResponse.answers}
              rowKey={(record, index) => index}
              columns={[
                { 
                  title: "Question", 
                  key: "question",
                  render: (_, record) => {
                    return record.questionLabel || "Unknown Question";
                  }
                },
                { 
                  title: "Answer", 
                  key: "answer",
                  render: (_, record) => {
                    // Enhanced answer display with icons
                    if (record.value !== undefined) {
                      // Handle boolean values
                      if (typeof record.value === 'boolean') {
                        return renderStatusIcon(record.value ? "ok" : "not_ok");
                      }
                      
                      // Check if value could be one of our status keywords
                      if (typeof record.value === 'string' && 
                          ['ok', 'not_ok', 'warning', 'n/a', 'na'].includes(record.value.toLowerCase())) {
                        return renderStatusIcon(record.value);
                      }
                      
                      return record.value;
                    }
                    
                    // If the answer has choices with icons (like ok, not_ok)
                    if (record.choices && record.choices.length > 0) {
                      return (
                        <div className="flex items-center">
                          {record.choices.map((choice, idx) => {
                            let icon = null;
                            switch(choice.icon?.toLowerCase()) {
                              case 'ok':
                                icon = <CheckCircleFilled style={{ color: "#52c41a", fontSize: "16px" }} />;
                                break;
                              case 'not_ok':
                                icon = <CloseCircleFilled style={{ color: "#f5222d", fontSize: "16px" }} />;
                                break;
                              case 'warning':
                                icon = <WarningFilled style={{ color: "#faad14", fontSize: "16px" }} />;
                                break;
                              case 'n/a':
                              case 'na':
                                icon = <span className="text-gray-400 font-medium">N/A</span>;
                                break;
                            }
                            return (
                              <div key={idx} className="flex items-center mr-2">
                                {icon && <span className="mr-1">{icon}</span>}
                                <span>{choice.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    
                    return record.answer || "N/A";
                  }
                },
                { 
                  title: "Comment", 
                  dataIndex: "comment", 
                  key: "comment",
                  render: (text) => text || "N/A"
                }
              ]}
              pagination={false}
            />
            
          
            
            {/* Handle uploaded images */}
            {selectedResponse.answers.some(answer => answer.uploadedImages && answer.uploadedImages.length > 0) && (
              <div className="mt-4">
                <h4 className="font-bold mb-2">Uploaded Images:</h4>
                <div className="flex flex-wrap">
                  {selectedResponse.answers
                    .filter(answer => answer.uploadedImages && answer.uploadedImages.length > 0)
                    .map((answer, index) => (
                      <div key={index} className="mr-4 mb-4">
                        <div className="mb-1">
                          <strong>{answer.questionLabel || "Unknown Question"}:</strong>
                        </div>
                        <div className="flex flex-wrap">
                          {answer.uploadedImages.map((img, imgIndex) => (
                            <img 
                              key={imgIndex} 
                              src={img} 
                              alt="Uploaded" 
                              style={{ width: "100px", margin: "5px" }} 
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
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