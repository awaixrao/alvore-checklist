import { FiSearch, FiBell, FiUser, FiHelpCircle, FiPlus } from "react-icons/fi";

const GeneralNavBar = () => {
  return (
    <header className="flex items-center justify-between px-3 py-2 bg-white shadow-md">
      {/* Search Bar */}
      <div className="relative w-1/2 sm:w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <FiSearch
          size={14}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <FiUser
          size={14}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiBell
          size={14}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiHelpCircle
          size={14}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiPlus
          size={14}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
      </div>

      {/* Toggle Button Placeholder */}
      <div className="flex items-center justify-end sm:hidden">
        <div className="w-6 h-6 flex flex-col justify-between cursor-pointer"></div>
      </div>
    </header>
  );
};

export default GeneralNavBar;
