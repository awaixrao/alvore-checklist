import { FiUser, FiGrid } from "react-icons/fi";
import { MdViewCompact } from "react-icons/md";

const DashboardNav = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 py-4 bg-white shadow-md md:px-6 space-y-3 md:space-y-0">
      {/* Left Section: Dashboard Title */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            My Dashboard
          </h1>
          <span className="text-gray-500 cursor-pointer">▼</span>
          <FiUser size={18} className="text-gray-500 cursor-pointer" />
        </div>

        {/* Hamburger Icon for mobile screens */}
      </div>

      {/* Right Section: Dropdown and Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto space-y-3 md:space-y-0">
        {/* Dropdown: All Groups */}
        <div className="relative w-full sm:w-48">
          <select className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>All Groups</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Compact Button */}
        <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
          <MdViewCompact size={16} className="mr-2" />
          Compact
        </button>

        {/* Manage Widgets Button */}
        <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
          <FiGrid size={16} className="mr-2" />
          Manage Widgets
          <span className="ml-1 text-gray-500">▼</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardNav;
