import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataInspection = [
  { name: "July 23", lastWeek: 0, thisWeek: 0 },
  { name: "Aug 23", lastWeek: 30, thisWeek: 20 },
  { name: "Sep 23", lastWeek: 10, thisWeek: 0 },
  { name: "Oct 23", lastWeek: 0, thisWeek: 10 },
];

const dataCost = [
  { name: "Jun 23", cost: 0 },
  { name: "July 23", cost: 40 },
  { name: "Aug 23", cost: 0 },
  { name: "Sep 23", cost: 0 },
  { name: "Oct 23", cost: 0 },
  { name: "Nov 23", cost: 0 },
];

const DashboardSectionSix = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Inspection Submission */}
      <div className="bg-white shadow rounded-lg p-4 h-[35vh] flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-2">
          Inspection Submission
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataInspection}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            {/* Grid Lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 40]}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {/* Lines */}
            <Line
              type="monotone"
              dataKey="lastWeek"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 6, fill: "#3B82F6", strokeWidth: 2, stroke: "#3B82F6" }}
              name="Last Week"
            />
            <Line
              type="monotone"
              dataKey="thisWeek"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ r: 6, fill: "#F59E0B", strokeWidth: 2, stroke: "#F59E0B" }}
              name="This Week"
            />
            <Legend iconType="circle" align="center" verticalAlign="bottom" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Costs Per Meter */}
      <div className="bg-white shadow rounded-lg p-4 h-[35vh] flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-2">Costs Per Meter</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataCost}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            {/* Grid Lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 40]}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {/* Lines */}
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 6, fill: "#3B82F6", strokeWidth: 2, stroke: "#3B82F6" }}
              name="Cost/Mi"
            />
            <Legend iconType="circle" align="center" verticalAlign="bottom" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardSectionSix;
