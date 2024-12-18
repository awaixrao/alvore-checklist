import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dataReason = [{ name: "No Reason For Repair", value: 6 }];
const dataSystem = [{ name: "No System Code", value: 6 }];

const COLORS = ["#EF4444"]; // Solid red color

const DashboardSectionFive = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Top Reason For Repair */}
      <div className="bg-white shadow rounded-lg p-4 h-[35vh] flex flex-col">
        {/* Heading */}
        <div className="mb-4">
          <h2 className="text-sm md:text-base font-semibold text-gray-800">
            Top Reason For Repair
          </h2>
          <p className="text-xs text-gray-500">Last 90 Days</p>
        </div>
        {/* Content */}
        <div className="flex items-center flex-grow">
          {/* Left Circle */}
          <div className="w-1/3 flex items-center justify-center">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={dataReason}
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
                No Reason For Repair
              </p>
            </div>
            <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-bold">
              6
            </span>
          </div>
        </div>
      </div>

      {/* Top System Codes By Usage */}
      <div className="bg-white shadow rounded-lg p-4 h-[35vh] flex flex-col">
        {/* Heading */}
        <div className="mb-4">
          <h2 className="text-sm md:text-base font-semibold text-gray-800">
            Top System Codes By Usage
          </h2>
          <p className="text-xs text-gray-500">Last 90 Days</p>
        </div>
        {/* Content */}
        <div className="flex items-center flex-grow">
          {/* Left Circle */}
          <div className="w-1/3 flex items-center justify-center">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={dataSystem}
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
                No System Code
              </p>
            </div>
            <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-bold">
              6
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionFive;
