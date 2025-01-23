import React from "react";

const ReportsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading with Branch Dropdown and Date Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-4">
          {/* Branch Dropdown */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select Branch</option>
            <option>Branch 1</option>
            <option>Branch 2</option>
          </select>
          {/* Date Range Filter */}
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Two Large Cards in First Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Number of Fixed Issues */}
        <div className="bg-green-500 text-white rounded-lg p-6 shadow-md flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Number of Fixed Issues</h3>
          </div>
          <span className="text-4xl font-bold">85</span>
        </div>

        {/* Pending Issues */}
        <div className="bg-orange-500 text-white rounded-lg p-6 shadow-md flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Pending Issues</h3>
          </div>
          <span className="text-4xl font-bold">15</span>
        </div>
      </div>

      {/* Four Small Cards in Single Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Reports Presented */}
        <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-sm">Reports Presented</h3>
          <div className="text-2xl font-bold">58/70</div>
          <span className="text-green-500">88%</span>
        </div>

        {/* Pending Reports */}
        <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-sm">Pending Reports</h3>
          <div className="text-2xl font-bold">58/70</div>
          <span className="text-red-500">12%</span>
        </div>

        {/* Average Compliance */}
        <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-sm">Average Compliance</h3>
          <div className="text-2xl font-bold">85%</div>
          <span className="text-red-500">-8%</span>
        </div>

        {/* Average Time Taken */}
        <div className="bg-white rounded-lg p-4 shadow-md border flex flex-col items-center">
          <h3 className="font-semibold text-sm">Average Time Taken</h3>
          <div className="text-2xl font-bold">2h 15m</div>
          <span className="text-green-500">+8.5%</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
