const DashboardSectionOne = () => {
  return (
    <div className="p-3 flex justify-center">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl w-full">
        {/* First Column - Full Height */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Repair Priority Class Trends
            </h2>
            <button className="text-gray-400">...</button>
          </div>
          <div className="flex-grow max-h-full bg-gray-100 flex justify-center items-center rounded">
            <p className="text-gray-400">[Chart Placeholder]</p>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
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
        </div>

        {/* Second Column - Two Equal Height Cards */}
        <div className="flex flex-col gap-4">
          {/* First Half */}
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Repair Priority Class Trends
              </h2>
              <button className="text-gray-400">...</button>
            </div>
            <div className="flex-grow flex justify-center items-center">
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
          </div>

          {/* Second Half */}
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Time To Resolve</h2>
              <button className="text-gray-400">...</button>
            </div>
            <div className="flex-grow bg-gray-100 flex justify-center items-center rounded">
              <p className="text-gray-400">[Line Chart Placeholder]</p>
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
