import { PieChart, Pie, Cell } from "recharts";

const inspectionData = [
  { name: "Completed", value: 70, color: "#22C55E" }, // Green
  { name: "Pending", value: 30, color: "#EF4444" }, // Red
];

const DashboardSectionSeven = () => {
  return (
    <div className="p-3 md:p-5 flex justify-center">
      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl w-full">
        {/* Card 1: All Faults */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">All Faults</h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-grow">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-blue-500">5</p>
              <p className="text-xs md:text-sm text-gray-500">Open</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-500">1</p>
              <p className="text-xs md:text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </div>

        {/* Card 2: Overdue Inspections */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Overdue Inspections
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-grow">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-blue-500">5</p>
              <p className="text-xs md:text-sm text-gray-500">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-500">1</p>
              <p className="text-xs md:text-sm text-gray-500">Of Total Due</p>
            </div>
          </div>
        </div>

        {/* Card 3: Item Failure Inspections Rate */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Item Failure Inspections Rate
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-grow">
            <div className="text-center">
              <p className="text-lg md:text-2xl font-bold text-blue-500">
                Either%
              </p>
              <p className="text-xs md:text-sm text-gray-500">This Week</p>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-2xl font-bold text-green-500">
                ▼ 2%
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                Change From Last Week
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Inspections Summary */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Inspections Summary
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            {/* Pie Chart */}
            <div className="w-28 h-28 md:w-32 md:h-32">
              <PieChart width={120} height={120}>
                <Pie
                  data={inspectionData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                >
                  {inspectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <p className="text-center text-xs md:text-sm text-gray-500 mt-2">
            Last 30 Days
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionSeven;
