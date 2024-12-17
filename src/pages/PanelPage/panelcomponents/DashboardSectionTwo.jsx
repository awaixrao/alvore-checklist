
const DashboardSectionTwo = () => {
  return (
    <div className="p-5 flex justify-center">
      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl w-full">
        {/* Card 1 */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col h-[30vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold">
              Repair Priority Class Trends
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center flex-grow space-x-8">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-yellow-500">5</p>
              <p className="text-base text-gray-500 font-medium">Open</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-blue-500">1</p>
              <p className="text-base text-gray-500 font-medium">Overdue</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col h-[30vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold">
              Repair Priority Class Trends
            </h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center flex-grow space-x-8">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-red-500">3</p>
              <p className="text-base text-gray-500 font-medium">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-yellow-500">2</p>
              <p className="text-base text-gray-500 font-medium">Due Soon</p>
            </div>
          </div>
        </div>

        {/* Card 3: Active Work Orders */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col h-[30vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold">Active Work Orders</h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex-grow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-blue-500 rounded-full mr-3"></span>
                <p className="text-lg font-medium text-gray-700">Open</p>
              </div>
              <span className="text-base font-bold text-gray-500">10</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-yellow-500 rounded-full mr-3"></span>
                <p className="text-lg font-medium text-gray-700">Pending</p>
              </div>
              <span className="text-base font-bold text-gray-500">5</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col h-[30vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold">Contact Renewal Reminders</h2>
            <button className="text-gray-400 text-lg">...</button>
          </div>
          <div className="flex justify-center items-center flex-grow space-x-8">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-red-500">1</p>
              <p className="text-base text-gray-500 font-medium">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-yellow-500">1</p>
              <p className="text-base text-gray-500 font-medium">Due Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSectionTwo;
