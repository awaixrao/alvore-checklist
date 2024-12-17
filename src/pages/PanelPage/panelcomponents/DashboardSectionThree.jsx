const DashboardSectionThree = () => {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[60vh] p-4 md:p-6">
      {/* Left Side: 4 Cards */}
      <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Each card has 'flex' and 'h-full' to ensure equal height */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800">
            Vehicle Assignments
          </h3>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-3xl font-bold text-green-600">5</span>
            <span className="text-gray-500">Assigned</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-3xl font-bold text-yellow-500">1</span>
            <span className="text-gray-500">Unassigned</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800">
            Vehicle Status
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-between items-center text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                <span className="font-medium">Active</span>
              </div>
              <span className="bg-green-200 text-green-600 rounded-full px-2 py-1 text-xs font-bold">
                5
              </span>
            </li>
            <li className="flex justify-between items-center text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                <span className="font-medium">In Shop</span>
              </div>
              <span className="bg-yellow-200 text-yellow-600 rounded-full px-2 py-1 text-xs font-bold">
                1
              </span>
            </li>
            <li className="flex justify-between items-center text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 bg-blue-500 rounded-full"></span>
                <span className="font-medium">Inactive</span>
              </div>
              <span className="bg-blue-200 text-blue-600 rounded-full px-2 py-1 text-xs font-bold">
                1
              </span>
            </li>
            <li className="flex justify-between items-center text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                <span className="font-medium">Out Of Service</span>
              </div>
              <span className="bg-red-200 text-red-600 rounded-full px-2 py-1 text-xs font-bold">
                1
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800">
            Vehicle Locations
          </h3>
          <p className="mt-6 text-gray-400">No Results</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800">
            Critical Faults
          </h3>
          <p className="mt-6 text-gray-400">No Results</p>
        </div>
      </div>

      {/* Right Side: Single Card */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Comments
          </h3>
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">No Comment To Show</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionThree;
