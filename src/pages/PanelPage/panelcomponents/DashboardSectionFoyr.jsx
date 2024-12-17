import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataFuel = [
  { name: "Jun 23", cost: 0 },
  { name: "July 23", cost: 0 },
  { name: "Aug 23", cost: 0 },
  { name: "Sep 23", cost: 1100 },
  { name: "Oct 23", cost: 950 },
  { name: "Nov 23", cost: 0 },
];

const dataServices = [
  { name: "Jun 23", cost: 200 },
  { name: "July 23", cost: 600 },
  { name: "Aug 23", cost: 400 },
  { name: "Sep 23", cost: 300 },
  { name: "Oct 23", cost: 700 },
  { name: "Nov 23", cost: 0 },
];

const dataOther = [
  { name: "Jun 23", cost: 0 },
  { name: "July 23", cost: 800 },
  { name: "Aug 23", cost: 200 },
  { name: "Sep 23", cost: 0 },
  { name: "Oct 23", cost: 0 },
  { name: "Nov 23", cost: 0 },
];

const dataTotal = [
  { name: "Jun 23", cost: 300 },
  { name: "July 23", cost: 1200 },
  { name: "Aug 23", cost: 700 },
  { name: "Sep 23", cost: 1400 },
  { name: "Oct 23", cost: 1600 },
  { name: "Nov 23", cost: 0 },
];

const DashboardSectionFour = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Fuel Costs */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-2">Fuel Costs</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataFuel}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Service Costs */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-2">Services Costs</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataServices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Other Costs */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-2">Other Costs</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataOther}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Total Costs */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-2">Total Costs</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataTotal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardSectionFour;
