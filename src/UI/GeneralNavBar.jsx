import { FiSearch, FiBell, FiUser, FiHelpCircle, FiPlus } from "react-icons/fi";

const GeneralNavBar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Search Fleetio"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiSearch
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6">
        <FiUser
          size={20}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiBell
          size={20}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiHelpCircle
          size={20}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiPlus
          size={20}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
      </div>
    </header>
  );
};

export default GeneralNavBar;
