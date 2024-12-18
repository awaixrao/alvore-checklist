const DashboardSectionTwo = () => {
  return (
    <div className="p-3 md:p-5 flex justify-center">
      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl w-full">
        {/* Card 1 */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Repair Priority Class Trends
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-grow">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-500">
                5
              </p>
              <p className="text-xs md:text-sm text-gray-500">Open</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-blue-500">1</p>
              <p className="text-xs md:text-sm text-gray-500">Overdue</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Repair Priority Class Trends
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-grow">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-500">3</p>
              <p className="text-xs md:text-sm text-gray-500">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-500">
                2
              </p>
              <p className="text-xs md:text-sm text-gray-500">Due Soon</p>
            </div>
          </div>
        </div>

        {/* Card 3: Active Work Orders */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Active Work Orders
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="space-y-3 md:space-y-4 flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-3 w-3 md:h-4 md:w-4 bg-blue-500 rounded-full mr-2"></span>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  Open
                </p>
              </div>
              <p className="text-sm md:text-base font-bold text-gray-500">10</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-3 w-3 md:h-4 md:w-4 bg-yellow-500 rounded-full mr-2"></span>
                <p className="text-xs md:text-sm text-gray-700 font-medium">
                  Pending
                </p>
              </div>
              <p className="text-sm md:text-base font-bold text-gray-500">5</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Contact Renewal Reminders
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-grow">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-500">1</p>
              <p className="text-xs md:text-sm text-gray-500">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-500">
                1
              </p>
              <p className="text-xs md:text-sm text-gray-500">Due Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionTwo;
