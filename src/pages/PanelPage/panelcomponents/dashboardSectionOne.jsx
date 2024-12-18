import ReactApexChart from "react-apexcharts";

const DashboardSectionOne = () => {
  // Data for the Area Chart (First Column)
  const areaChartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    fill: {
      type: "solid",
      opacity: 0.2,
      colors: ["#D1D5DB"],
    },
    stroke: {
      width: 2,
      curve: "smooth",
      colors: ["#A3A3A3"],
    },
    xaxis: {
      categories: ["Jun 23", "Jul 23", "Aug 23", "Sep 23", "Oct 23", "Nov 23"],
    },
    yaxis: {
      labels: { formatter: (value) => `${value}%` },
    },
    tooltip: { enabled: true },
  };
  const areaChartSeries = [
    { name: "Repair Trends", data: [0, 100, 100, 0, 100, 0] },
  ];

  // Data for the Line and Dot Chart (Time To Resolve)
  const lineChartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: 3 },
    markers: {
      size: 6,
      colors: ["#FACC15"],
      strokeColors: "#FACC15",
      strokeWidth: 2,
    },
    xaxis: {
      categories: ["Jun 23", "Jul 23", "Aug 23", "Sep 23", "Oct 23", "Nov 23"],
    },
    yaxis: { labels: { formatter: (value) => value } },
    colors: ["#22C55E", "#FACC15"],
    tooltip: { enabled: true },
  };
  const lineChartSeries = [
    { name: "Avg. Time To Resolve", data: [2, 2.5, 3, 2, 1.5, 2] },
    { name: "# Of Issues", data: [4, 3, 4, 2, 3, 2] },
  ];

  return (
    <div className="p-3 flex justify-center">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl w-full">
        {/* First Column - Area Chart */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Repair Priority Class Trends
            </h2>
            <button className="text-gray-400">...</button>
          </div>
          <div className="flex-grow">
            <ReactApexChart
              options={areaChartOptions}
              series={areaChartSeries}
              type="area"
              height={250}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="h-2 w-2 bg-gray-400 rounded-full mr-1"></span>
              No Repair Priority Class
            </span>
            <span className="flex items-center">
              <span className="h-2 w-2 bg-red-400 rounded-full mr-1"></span>
              Emergency
            </span>
            <span className="flex items-center">
              <span className="h-2 w-2 bg-yellow-400 rounded-full mr-1"></span>
              Non-Scheduled
            </span>
            <span className="flex items-center">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-1"></span>
              Scheduled
            </span>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-4">
          {/* Repair Priority Card */}
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Repair Priority Class Trends
              </h2>
              <button className="text-gray-400">...</button>
            </div>
            <div className="flex justify-center space-x-8">
              <div>
                <p className="text-3xl font-bold text-red-500">3</p>
                <p className="text-gray-500 mt-1">Overdue</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">1</p>
                <p className="text-gray-500 mt-1">Due Soon</p>
              </div>
            </div>
          </div>

          {/* Line and Dot Chart */}
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Time To Resolve</h2>
              <button className="text-gray-400">...</button>
            </div>
            <div className="flex-grow">
              <ReactApexChart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                height={200}
              />
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-1"></span>
                Avg. Time To Resolve
              </span>
              <span className="flex items-center">
                <span className="h-2 w-2 bg-yellow-400 rounded-full mr-1"></span>
                # Of Issues
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionOne;
