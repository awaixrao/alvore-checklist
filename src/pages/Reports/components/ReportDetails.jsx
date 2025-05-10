import React, { useState } from "react";
import { Table, Card, Select, Button, message, Spin, Modal, Badge } from "antd";
import moment from "moment";
import { useGetQuery } from "../../../services/apiService";
import UnitReports from "./UnitReports"; // Import UnitReports
import { 
  CheckCircleFilled, 
  CloseCircleFilled, 
  WarningFilled,
  QuestionCircleOutlined
} from "@ant-design/icons";

const ReportDetails = ({ branchName, dateRange, data, summary, handleViewChecklist }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showUnitReports, setShowUnitReports] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  
  console.log("🔍 ReportDetails Props:", { branchName, dateRange, data });

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

  // Update the fault counting logic
  const processedData = data?.map((record) => ({
    ...record,
    faultsReported: record.answers?.reduce((faultCount, answer) => {
      // Count how many not_ok choices are in this answer
      const notOkCount = answer.choices?.filter(choice => choice.icon === "not_ok").length || 0;
      return faultCount + notOkCount;
    }, 0) || 0,
    units: Array.isArray(record.units) 
      ? record.units.join(", ")
      : typeof record.units === 'string' 
        ? record.units 
        : "N/A",
    greenFlags: record.greenFlags || 0,
    orangeFlags: record.orangeFlags || 0,
    redFlags: record.redFlags || 0,
  })) || [];

  // Update the units filtering logic
  const filteredReports = selectedUnit 
    ? processedData.filter((record) => {
        const recordUnits = typeof record.units === 'string' 
          ? record.units.split(", ")
          : [];
        return recordUnits.includes(selectedUnit);
      })
    : processedData;

  // Handle filtering and rendering UnitReports
  const handleFilterUnit = () => {
    if (selectedUnit) {
      setShowUnitReports(true); // Show UnitReports view
    } else {
      message.warning("Please select a unit to view reports.");
    }
  };

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

  // Function to handle viewing a report - directly opens the modal
  const handleViewReport = (record) => {
    setSelectedResponse(record);
    setIsResponseVisible(true);
  };

  // Function to handle closing the report modal
  const handleCloseResponse = () => {
    setIsResponseVisible(false);
    setSelectedResponse(null);
  };

  // Render UnitReports if the flag is true
  if (showUnitReports && selectedUnit) {
    return (
      <div className="p-4">
        <Button type="default" onClick={() => setShowUnitReports(false)} className="mb-4">
          Back to Report Details
        </Button>
        <UnitReports data={filteredReports} unit={selectedUnit} branchName={branchName} dateRange={dateRange} />
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
            <>
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
              <Button type="primary" onClick={handleFilterUnit}>
                Filter Unit
              </Button>
            </>
          )}
        </div>
      </div>

      <p className="text-gray-600">
        Date Range: {dateRange?.[0] || "N/A"} to {dateRange?.[1] || "N/A"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-4">
        <Card className="shadow-md">
          <h2 className="text-lg font-semibold">Total Faults</h2>
          <p className="text-2xl font-bold text-red-500">
            {processedData.reduce((sum, item) => sum + item.faultsReported, 0)}
          </p>
        </Card>
        <Card className="shadow-md border-green-500">
          <h2 className="text-lg font-semibold text-green-600">Green Flags</h2>
          <p className="text-2xl font-bold text-green-600">
            {processedData.reduce((sum, item) => sum + item.greenFlags, 0)}
          </p>
        </Card>
        <Card className="shadow-md border-orange-500">
          <h2 className="text-lg font-semibold text-orange-600">Orange Flags</h2>
          <p className="text-2xl font-bold text-orange-600">
            {processedData.reduce((sum, item) => sum + item.orangeFlags, 0)}
          </p>
        </Card>
        <Card className="shadow-md border-red-500">
          <h2 className="text-lg font-semibold text-red-600">Red Flags</h2>
          <p className="text-2xl font-bold text-red-600">
            {processedData.reduce((sum, item) => sum + item.redFlags, 0)}
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
            title: "Branch Code",
            dataIndex: "branchCode",
            key: "branchCode",
          },
          {
            title: "Checklist Title",
            dataIndex: "checklistTitle",
            key: "checklistTitle",
          },
          {
            title: "Driver",
            dataIndex: "driver",
            key: "driver",
          },
          {
            title: "Units",
            dataIndex: "units",
            key: "units",
            render: (units) => units || "N/A",
          },
          {
            title: "Routes",
            dataIndex: "routes",
            key: "routes",
          },
          {
            title: "Green Flags",
            dataIndex: "greenFlags",
            key: "greenFlags",
            render: (value) => (
              <Badge count={value} style={{ backgroundColor: '#52c41a' }} />
            ),
          },
          {
            title: "Orange Flags",
            dataIndex: "orangeFlags",
            key: "orangeFlags",
            render: (value) => (
              <Badge count={value} style={{ backgroundColor: '#faad14' }} />
            ),
          },
          {
            title: "Red Flags",
            dataIndex: "redFlags",
            key: "redFlags",
            render: (value) => (
              <Badge count={value} style={{ backgroundColor: '#f5222d' }} />
            ),
          },
          {
            title: "Faults Reported",
            dataIndex: "faultsReported",
            key: "faultsReported",
            render: (faults) => <span className="text-red-500 font-bold">{faults}</span>,
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Button
                type="link"
                onClick={() => handleViewReport(record)}
              >
                View Report
              </Button>
            ),
          },
        ]}
        dataSource={filteredReports}
        rowKey={(record) => record._id || Math.random()}
        pagination={{ pageSize: 5 }}
        // Summary row removed as requested
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
            <h4>Created At: {selectedResponse.formattedDate || moment(selectedResponse.createdAt).format("YYYY-MM-DD")}</h4>
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
            {selectedResponse.answers && selectedResponse.answers.some(answer => answer.uploadedImages && answer.uploadedImages.length > 0) && (
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
    </div>
  );
};

export default ReportDetails;