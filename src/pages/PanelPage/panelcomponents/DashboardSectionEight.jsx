import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#EF4444"]; // Solid red color
const dataCategory = [{ name: "No Category Code", value: 6 }];

const DashboardSectionEight = () => {
  return (
    <div className="p-3 md:p-5 flex justify-center">
      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl w-full">
        {/* Card 1: ROs Needing Approval */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-center items-center h-[35vh]">
          <h2 className="text-sm md:text-base font-semibold mb-2">
            ROs Needing Approval
          </h2>
          <p className="text-blue-500 text-4xl md:text-5xl font-bold mt-2 mb-2">
            0:17
          </p>
          <p className="text-xs md:text-sm text-center text-gray-500 px-2">
            Save An Average Of 17 Minutes Approving And Recording Each External
            Repair Order.
          </p>
        </div>

        {/* Card 2: On Time Services Compliance */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-center h-[35vh]">
          <h2 className="text-sm md:text-base font-semibold text-center mb-2">
            On Time Services Compliance
          </h2>
          <div className="flex justify-around items-center mb-4">
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-3xl font-bold">44%</p>
              <p className="text-gray-500 text-sm mt-1">All Time</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-yellow-500 text-3xl font-bold">67%</p>
              <p className="text-gray-500 text-sm mt-1">Last 30 Days</p>
            </div>
          </div>
        </div>

        {/* Card 3: Top Category Codes By Usage */}
        {/* Card 3: Top Category Codes By Usage */}
        <div className="bg-white shadow rounded-lg p-4 sm:col-span-2 h-[35vh]">
          {/* Header Section */}
          <div className="flex flex-col mb-4">
            <h2 className="text-sm md:text-base font-semibold">
              Top Category Codes By Usage
            </h2>
            <p className="text-xs text-gray-500 mt-1">Last 90 Days</p>
          </div>

          {/* Content Section */}
          <div className="flex items-center">
            {/* Left Circle (Graph) */}
            <div className="w-1/3 flex items-center justify-center">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie
                    data={dataCategory}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill={COLORS[0]}
                  >
                    <Cell fill={COLORS[0]} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Right Content */}
            <div className="w-2/3 flex items-center justify-between pl-4">
              <div className="flex items-center space-x-2">
                <span className="h-5 w-5 bg-red-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">
                  No Category Code
                </p>
              </div>
              <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-bold">
                6
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Uncategorized Service Tasks */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-center h-[35vh]">
          <h2 className="text-sm md:text-base font-semibold text-center mb-4">
            Uncategorized Service Tasks
          </h2>
          <div className="flex justify-center items-center mb-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-2xl">✔</span>
            </div>
          </div>
          <p className="text-xs md:text-sm text-center text-gray-500">
            All Service Tasks Are Categorized
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionEight;
